---
title: CKAD Preparation Guide
author: Harrold Lechuga
date: 2020-03-23 11:33:00 +0800
categories: ["", Blogs]
tags: [kubernetes]
status: publish
toc: true
pin: true
image: https://hlechuga-blog-content-share.s3-ap-southeast-1.amazonaws.com/kerbernetes-cert.png
---

CKAD Preparation Guide
============

CKAD or Certified Kubernetes Application Developer is one of the kubernetes certification aims to equip developers an ability to design, build, configure, and expose cloud native applications for Kubernetes. A Certified Kubernetes Application Developer can define application resources and use core primitives to build, monitor, and troubleshoot scalable applications and tools in Kubernetes. Here are few tips which, in my opinion, could help candidates perform at their best not only during the exam but also on day-to-day jobs.

### Content

- Core Concepts 13%
- Configuration 18%
- Multi-Container Pods 10%
- Observability 18%
- Pod Design 20%
- Services & Networking 13%
- State Persistence 8%

### Requirements

- Exam registration and confirmation code of exam.
- A quiet room
- A laptop or computer with camera and good internet connection. Additional monitor is optional but allowed. 
- Valid ID

### Room Environment

- You should be alone in a room.
- Your camera must not against the lights. Avoid being behind the window or lights.
- Ready your valid ID. You will persent it to the proctor
- You will be asked to show your environment by turning the camera around you slowly and behind your desk. Remove anything on your desk or beside your computer. Only a clear bottled water(no labels) or a clear glass of water is allowed on table. 
- Remain silent. You cannot talk or whisper words during exam. Do not read questions out loud. Do not put you hand over your mouth or face. Your face should remain entirely visible all the time. Failure to do so might disqualify you

### Desktop Environment

- Only the browser is allowed open on desktop; you can only have 2 tabs, the exam and the kubernetes documentation. You can request to have it in separate window but strictly no other tabs.
- You may undock the applications on taskbar or dock to avoid opening them accidentally.
- You are allowed to open bookmarks. Bookmarking all essential page could save you time on navigating the documentation.

### Tips and Advice

1. This is not a "multiple choice" kind of exam. You must know kubernetes really well and fully utilize the kubectl (and vim or nano for editing).
2. The exam takes 2hrs and the passing rate is 66%. Speed is the key so practice and practice. Practice with https://github.com/dgkanatsios/CKAD-exercises/blob/master. It covers a lot. 
3. If you have extra budget, treat yourself and get a training course with positive reviews. A course from Mumshad Manambath - CKAD with Practice Test on Udemy is a good one. 
4. There's a notepad on the exam's sidebar, use it to note your things and note those skipped/unanswered questions. 
5. Do not write YAML files from scratch. Start by creating a resource by using `kubectl run` or `kubectl create` then edit it

Use `kubectl create -h` to see list of declarative objects

```shell
Available Commands:
  clusterrole         Create a ClusterRole.
  clusterrolebinding  Create a ClusterRoleBinding for a particular ClusterRole
  configmap           Create a configmap from a local file, directory or literal value
  cronjob             Create a cronjob with the specified name.
  deployment          Create a deployment with the specified name.
  job                 Create a job with the specified name.
  namespace           Create a namespace with the specified name
  poddisruptionbudget Create a pod disruption budget with the specified name.
  priorityclass       Create a priorityclass with the specified name.
  quota               Create a quota with the specified name.
  role                Create a role with single rule.
  rolebinding         Create a RoleBinding for a particular Role or ClusterRole
  secret              Create a secret using specified subcommand
  service             Create a service using specified subcommand
  serviceaccount      Create a service account with the specified name
```

> I recommend using `generators` or `kubectl run` for creating these 4 objects. It is fast and easy. 

```bash
# For Pod; adding --restart="Never" will make a pod
kubectl run <pod_name> --image <image_tag> --restart Never
# For Deployment; omiting --restart will make a deployment
kubectl run <deployment_name> --image <image_tag>
# For Job; adding --restart="OnFailure" will make a job
kubectl run <job_name> --image <image_tag> --restart OnFailure
# For CronJobs; adding --restart="Onfailure" and an schedule will make a cronjob
kubectl run <job_name> --image <image_tag> --restart OnFailure --schedule="*/1 * * * *"
```

> Using **equal** `--key="value"`  or **space** `--key value` to pair key-value arguments is entirely up to you. 



4. Save an object's yaml without actually creating it.  Use `-o yaml --dry-run --export`. 

```shell
kubectl run <pod_name> --image image_tag --restart Never -o yaml --dry-run --export > pod.yaml

vi pod.yaml

kubectl apply -f pod.yaml
```

​		Or you can directly edit the pod once created using `kubectl edit `. 

```
kubectl edit po <pod_name>
```

​		Be careful on some imutable fields of pods as it no editable during pods runtime. Example: `pod.specs.containers.args` or `pod.specs.tolerations`

5. Learn on navigating through cluster and namespace. Be aware of the namespace you're working on while solving the problem, you might editing the wrong namespace that obviously will fail you.Unlike in Openshift with `oc project` In kubernetes you have to navigate on `kubeconfig` and set them manually. I really recommend to get hang on this 

```shell
# To know your current context and namespace. Your current context has an asterisk(*)
kubectl config get-contexts
# To set the namespace of the context you want to modify
kubectl config set-context <context_name> --namespace <namespace>
# To set and use ayour active context
kubectl config use-context <context_name>
```



6. Force deletion of pods is one a great time saver. Some pods are annoying and took time to get deleted or sometimes it wont get deleted. 

```shell
kubectl delete po <pod_name> --force --grace-period 0 
```



7. Fast modification.

   Use `kubectl set image` on fast modification of image

 ```shell
kubectl set image deploy frontend <container_name>=<image_tag>
 ```

​			Use `kubectl label` or `kubectl annotate` 

```shell
kubectl annotate po <pod_name> decription=description
kubectl label po <pod_name> key=value
```

​			Use `kubectl set resource` for resources

```shell
kubectl set resources po <pod_name> --requests=cpu=100m,memory=100Mi
```



8. Use `kubectl explain`. I find it very useful. 

```shell
kubectl explain <object>.<fields>
kubectl explain --recursive <object>
# Sample 
kubectl explain pod.spec.toleration
```



9. Master vim! Atleast the basics. learn how to navigate through texts.

It is not a violation if you reconfigure your vim or nano editor. It can save you time on editing yaml files. 

```shell
vim ~/.vimrc
set nu
set expandtab
set shiftwidth=2
set tabstop=2
```



10. Set your aliases. Speed up your productivity by using aliases.

```shell
# sample only
alias kc='kubectl'
alias kdes='kubectl describe '
alias kap='kubectl apply -f '
alias kg='kubectl get --show-labels'
alias kgw='kubectl get -o wide --show-labels'
```

> You are not allowed to set aliases and vim setup before the exam. You must input them right during the exam. 

11. Know basic of crontab expression for creating cronjobs https://crontab.guru/. Basics are enough.  

12. Of all the question, The problem I find it hard to complete is the [Network Policy](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy) and [Logging architecture on multicontainer](https://kubernetes.io/docs/concepts/cluster-administration/logging/)(I answered it but took my time). Review this part and bookmark it. It has a large points.  

13. Learn and memorize object's field structure as much as you can. Navigating through the kubernetes documentation can consume a lot of your time. 

### Resources

https://medium.com/@nassim.kebbani/how-to-beat-kubernetes-ckad-certification-c84bff8d61b1

https://medium.com/chotot/tips-tricks-to-pass-certified-kubernetes-application-developer-ckad-exam-67c9e1b32e6e

https://medium.com/faun/kubectl-commands-cheatsheet-43ce8f13adfb

https://medium.com/@kgamanji/how-i-passed-my-ckad-with-97-6b54dcffa72f

https://medium.com/@iizotov/exam-notes-ckad-c1c4f9fb9e73

https://github.com/dgkanatsios/CKAD-exercises/blob/master/e.observability.md

https://github.com/twajr/ckad-prep-notes

https://www.linkedin.com/pulse/my-ckad-exam-experience-atharva-chauthaiwale/

https://docs.google.com/spreadsheets/d/1WPHt0gsb7adVzY3eviMK2W8LejV0I5m_Zpc8tMzl_2w/edit#gid=0

