---

title: Designing Highly Available Kubernetes Application
author: Harrold Lechuga
date: 2020-12-02 00:00:00 +0800
categories: ["", Blogs]
status: draft
toc: true
tags: [kubernetes, sre]
image: https://stackify.com/wp-content/uploads/2018/05/Continuous-delivery-with-Kubernetes-881x441.png
image_hide: false
---



https://orangesharing.com/pages/viewpage.action?pageId=204440519

# Kubernetes Improvements

```bash
# latest Kubernetes 
Kubernetes v1.20
#3.9 cluster's version
Server https://masters.tcx.non-prod.ichp.asia.ing.net:443
openshift v3.9.0+2e78773-56
kubernetes v1.9.1+a0ce1bc657
#3.11 cluster's version
Server https://masters.tcx.non-prod.wright.ichp.asia.ing.net:443
openshift v3.11.317
kubernetes v1.11.0+d4cacc0
```

This study will focus on achieving the high availability of an application running in Kubernetes by combining and testing these features of Kubernetes.

1. topologySpreadConstraints `v1.18 beta` `v1.19 stable`
2. podAntiAffinity `stable`
3. PodDisruptionBudget   `v1.5 beta ` 
4. RollingUpdateStrategy `stable`
5. HorizontalPodAutoScaler `beta` 
6. PodPriority `1.8 alpha` `1.11 stable`

### topologySpreadConstraints

topologySpreadConstraints controls how [Pods](https://kubernetes.io/docs/concepts/workloads/pods/) are spread across your cluster among failure-domains such as regions, zones, nodes, and other user-defined topology domains.

**maxSkew** describes the degree to which Pods may be unevenly distributed. It's the maximum permitted difference between the number of matching Pods in any two topology domains of a given topology type

```yaml
kind: Deployment
...
spec:
  topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: node
    whenUnsatisfiable: scheduleAnyway # DoNotSchedule
    labelSelector:
      matchLabels:
        beta.kubernetes.io/arch: amd64
```

It is possible to set default topology spread constraints for a cluster. Default topology spread constraints are applied to a Pod if, and only if:

- It doesn't define any constraints in its `.spec.topologySpreadConstraints`.
- It belongs to a service, replication controller, replica set or stateful set.

```yaml
apiVersion: kubescheduler.config.k8s.io/v1beta1
kind: KubeSchedulerConfiguration

profiles:
  - pluginConfig:
      - name: PodTopologySpread
        args:
          defaultConstraints:
            - maxSkew: 1
              topologyKey: topology.kubernetes.io/zone
              whenUnsatisfiable: ScheduleAnyway
          defaultingType: List
```

###### Scenario:

Using topologySpreadConstraints, intialize a deployment with 3 replicas. Increase replicas to 10. Drain one of the nodes.

```yaml
kind: Deployment
metadata:
  name: myapp
...
spec:
	template:
		spec:
  		topologySpreadConstraints:
  			- maxSkew: 1
    			topologyKey: node
    			whenUnsatisfiable: DoNotSchedule
    			labelSelector:
      			matchLabels:
        		app: myapp
```



###### Expected Result:

With replica of 3, pods are spread across the nodes with label `worker` 

![image-20210112162648995](/Users/oy84dc/Documents/Typora Images/image-20210112162648995.png)

After increasing the replica of `myapp` to 10.  The pods are still properly distributed

![image-20210112162639053](/Users/oy84dc/Documents/Typora Images/image-20210112162639053.png)

After `kind-worker2` was evicted. the pods are still properly distributed

![image-20210112163150264](/Users/oy84dc/Documents/Typora Images/image-20210112163150264.png)



### podAntiAffinity

anti-affinity allow you to constrain which nodes your pod is eligible to be scheduled *based on labels on pods that are already running on the node* rather than based on labels on nodes

```yaml
metadata:
  name: redis-cache
spec:
  selector:
    matchLabels:
      app: myapp
  replicas: 3
  template:
    metadata:
      labels:
        app: myapp
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - myapp				
            topologyKey: "kubernetes.io/hostname"
```

```yaml
    spec:
      affinity:
        podAntiAffinity: 
          preferredDuringSchedulingIgnoredDuringExecution: 
          - weight: 100  
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app 
                  operator: In 
                  values:
                  - myapp
              topologyKey: kubernetes.io/hostname
```



![image-20210119134313932](/Users/oy84dc/Documents/Typora Images/image-20210119134313932.png)

![image-20210119134318977](/Users/oy84dc/Documents/Typora Images/image-20210119134318977.png)

![image-20210119134341743](/Users/oy84dc/Documents/Typora Images/image-20210119134341743.png)



### PodDisruptionBudget

PodDisruptionBudget - protects pods from being evicted by specifying minimum and maximum pods to be allowed running. PDB can be configure by 2 settings. `minAvailable` describe that PDB will prevent deletion of pods if the number of pods is equal to 

```yaml
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: app1-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app:  myapp
```

```yaml
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: app1-pdb
spec:
  maxUnavailable: 1
  selector:
    matchLabels:
      app: app1
      
      
```



![image-20210119123525360](/Users/oy84dc/Documents/Typora Images/image-20210119123525360.png)



### RollingUpdateStrategy

RollingUpdate - `maxSurge` describes how many pods will be roll out during update. `maxUnavailable` describe how many pods is needed to be running to continue the deployment. Reaching Unavailable pods will pause the rolling update then continue when enough pods is then running. 

```yaml
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
```

```yaml
kind: Pod
...
spec:
  strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 25%
    maxUnavailable: 25%
```



### HorizontalPodAutoScaler

The Horizontal Pod Autoscaler automatically scales the number of Pods in a replication controller, deployment, replica set or stateful set based on observed CPU utilization (or, with [custom metrics](https://git.k8s.io/community/contributors/design-proposals/instrumentation/custom-metrics-api.md) support, on some other application-provided metrics).

```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: kube-dashboard
spec:
  maxReplicas: 10
  minReplicas: 3
  scaleTargetRef:
    apiVersion: extensions/v1beta1
    kind: Deployment
    name: kube-dashboard
  targetCPUUtilizationPercentage: 80
```



https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-configurable-scaling-behavior

Cooldown/delay is supported starting 1.18

```
behavior:
  scaleDown:
    stabilizationWindowSeconds: 60
```

```yaml
behavior:
  scaleDown:
    policies:
    - type: Pods
      value: 2
      periodSeconds: 60
    selectPolicy: Min
```



### PodPriority

Priority indicates the importance of a Pod relative to other Pods. If a Pod cannot be scheduled, the scheduler tries to preempt (evict) lower priority Pods to make scheduling of the pending Pod possible.

```yaml
api: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
description: "This priority class should be used for XYZ service pods only."
```





# NetworkPolicy

Pods become isolated by having a NetworkPolicy that selects them. Once there is any NetworkPolicy in a namespace selecting a particular pod, that pod will reject any connections that are not allowed by any NetworkPolicy. (Other pods in the namespace that are not selected by any NetworkPolicy will continue to accept all traffic.)

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: access-kube-dashboard
spec:
  podSelector:
    matchLabels:
      app: kube-dashboard
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: "locust-master"
  - from:
    - podSelector:
        matchLabels:
          app: "locust-slave"
```

