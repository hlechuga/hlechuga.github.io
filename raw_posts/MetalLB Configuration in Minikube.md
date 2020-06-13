---
title: MetalLB Configuration in Minikube — To enable Kubernetes service of type “LoadBalancer”
author: Faun
date: 2020-05-26
categories: ["", Blogs Share]
tags: [kubernetes, ]
original_post: https://medium.com/faun/metallb-configuration-in-minikube-to-enable-kubernetes-service-of-type-loadbalancer-9559739787df
---



Sofar in minikube there is no default implementation of network load-balancer. Load-balancer will remain in the “pending” state indefinitely when created. Minikube Version 1.10.0-beta.2 has a new powerful addon i.e. MetalLB. MetalLB had addressed the gap and provides the network LoadBalancer implementation as an addon.

Public cloud providers will assign the IP for the load balancer, whereas on bare metal MetalLB is responsible for the allocation of the IP Address.

Let’s see as how we can enable the same in minikube and configure the same with an example.

*minikube addons list* will show that metalLB is disabled.



![img](https://miro.medium.com/max/649/1*VG_RWQ_re7tr3J5Xi_gMKg.png)

Enable the addon using the command *minikube addons enable metallb*

![img](https://miro.medium.com/max/646/1*j4U5-RXpQcia8kTd4itxpg.png)

Once the addon is enabled, we can see that there are two components that are up and running in the cluster under *metallb-system* namespace. Controller and Speaker are those two components.

![img](https://miro.medium.com/max/653/1*Qg2mlpZtRdotFpJyPbeAyg.png)

The controller helps in the IP address assignment, whereas the speaker advertises layer -2 address.

As we have enabled the addon, now we have to configure the same for the addon to come into effect. We have to configure using the following command *minikube addons configure metallb .*

It will prompt for the IP Address range. As my minikube host IP is 192.168.99.100, I have given the range as below

![img](https://miro.medium.com/max/449/1*luAeO_xp3L0UszcfDbxFeQ.png)



![img](https://miro.medium.com/max/531/1*p4m2DHftnemOD25Vd0Xpqw.png)

Check the configuration which is stored in a config map, *kubectl describe configmap config -n metallb-system*



![img](https://miro.medium.com/max/515/1*TxHThDnyOpylA_hvupKb2g.png)

Now let’s try to create the deployment and expose the same using LoadBalancer. As we have got MetalLB configured, we can see the External IP address populated from the IP pool.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-blue-whale
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-blue-whale-app
  template:
    metadata:
      name: hello-blue-whale-pod
      labels:
        app: hello-blue-whale-app
    spec:
      containers:
      - name: hello-blue-whale-container
        image: vamsijakkula/hello-blue-whale:v1
        imagePullPolicy: Always
        ports:
        - containerPort: 80
      imagePullSecrets:
      - name: regcred
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-blue-whale-svc
  labels:
    app: hello-blue-whale-app
spec:
  selector:
    app: hello-blue-whale-app
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
```



![img](https://miro.medium.com/max/826/1*ev45mmwkgVMD_KVi0eAySQ.png)

Access the service using External IP Address(192.168.99.105) over the port 80 and we can see the Blue Whale App. When the service is accessed, the ARP request is sent to find out the MAC Address of the external IP Address and the speaker will respond back with the MAC address.

![img](https://miro.medium.com/max/1293/1*b5VNfvbVeUBGQLqez1wpcA.png)

