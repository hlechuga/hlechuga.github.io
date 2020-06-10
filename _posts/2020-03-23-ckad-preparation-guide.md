---
title: CKAD Preparation Guide
author: Harrold Lechuga
date: 2020-03-23 11:33:00 +0800
categories: ["", Blogs]
tags: [kubernetes]
toc: true
---

## Content

- Core Concepts 13%
- Configuration 18%
- Multi-Container Pods 10%
- Observability 18%
- Pod Design 20%
- Services & Networking 13%
- State Persistence 8%

## Requirements

- Exam registration and confimation code of exam. Register at https://www.cncf.io/certification/ckad/
- A quiet room. 
- Laptop or computer with good internet connection. You can check hardware compatibility in https://www.examslocal.com/ScheduleExam/Home/CompatibilityCheck ; 2nd monitor is optional. 
- Valid ID: Passport; Government-issued driver’s license/permit; Government-Issued local language ID (plastic card with photo and signature) or SSS; National Identity card or UMID; State or province-issued identity card or Postal ID; Debit (ATM)Card; Credit Card; Health Insurance Card.
- Exam Dration: 2hrs
- PASSING RATE: 66%

## Room Environment

- You must be alone in the room.
- Your camera must not against the light. Avoid being behind the widow or lights.
- You will be asked to show your environment by turning the camera around you slowly and behind of desk.
- Ready your valid ID. You must present it to the proctor.
- You are forbid to put anything else on your desk or beside your computer. 
- You cannot talk, whispering words. Do not read questions out loud, you must remain silent.
- You are forbid to put you hand over your mouth, your face should remain entirely visible all the time.
- Only a clear bottled water(no labels) or a clear glass of water are allowed on table.

## Desktop Environment

- Only the browser are allowed open and must have only 2 tabs; the exam and the kubernetes documentation. You can request to have separate window on each tab but strictly no other tab.
- Remove applications from dock or taskbar to avoid opening accidentally.
- You are allowed to open bookmarks. Bookmarking all essential page could save you navigation time.

## Tips and Advice

1. This is not a "multiple choice" kind of exam. You must know kubernetes really well and you must know how to fully utilize kubectl (and vim or nano for editing).
2. If you have budget, treat yourself and get a training course with positive reviews. I suggest a course from Mumshad Manambath - CKAD with Practice Test on Udemy. 
3. Practice with this one https://github.com/dgkanatsios/CKAD-exercises/blob/master. It covers a lot. 
4. Exam provides notepad on the browser(not notepad on your PC), There is no marker on exam, you cannot flag your questions and just go back. You must use the notepad to take note all your unanswered questions. 
5. Do not write YAML files from scratch. You can start by creating a pod, deployment, job or cronjob using `kubectl run` or `kubectl create`

Use `kubectl create -h` to see list of available objects

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
  service             Create a service using specified subcommand.
  serviceaccount      Create a service account with the specified name
```

> ​			I recommend using `generators` or `kubectl run` for creating these 4 objects. It is fast and easy. 
>

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



4. To save an object's yaml without actually creating it.  Use `-o yaml --dry-run --export`. 

```shell
kubectl run <pod_name> --image image_tag --restart Never -o yaml --dry-run --export > pod.yaml

vi pod.yaml

kubectl apply -f pod.yaml
```

​		Or you can directly edit the pod once created using `kubectl edit `. 

```
kubectl edit po <pod_name>
```

​		Be careful on some imutable fields of pods. It cannot be edited during pods runtime. Example. pod.specs.containers.args or pod.specs.tolerations

5. Better learn navigating through cluster and namespace. Always be aware of the namespace you're working on while answering a question. Using `-n <target_namespace> `  on every command is very time consuming. Unlike openshift that you can just `oc projects <namespace>` In kubernetes you have to navigate on `kubeconfig` and set them manually. I really recommend to get hang on this 

```shell
# To know your current context and namespace. Your current context has an asterisk(*)
kubectl config get-contexts
# To set the namespace of the context you want to modify
kubectl config set-context <context_name> --namespace <namespace>
# To set and use ayour active context
kubectl config use-context <context_name>
```



6. Some pods are annoying and dont get deleted easily. force deletion of pods is one a great time saver too. 

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



8. If you know the object structure very well. While your editing and you only forgot a small portion of it. You can use `kubectl explain`. I find it very useful. 

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



10. Set aliases. Again it is not a violation. Speed up your productivity by using aliases.

```shell
# sample only
alias kc='kubectl'
alias kdes='kubectl describe '
alias kap='kubectl apply -f '
alias kg='kubectl get --show-labels'
alias kgw='kubectl get -o wide --show-labels'
```

> You are not allowed to set aliases and vim setup before the exam. You must input them right during the exam. 



11. Know basic of crontab expression for creating cronjobs https://crontab.guru/. Just the basic.  

12. Of all the question, I find really hard to complete is the [Network Policy](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy) and [Logging on multicontainer](https://kubernetes.io/docs/concepts/cluster-administration/logging/)(I answered it but hard). Review this part and bookmark it. It has large points.  

13. Learn and memorize object's field structure as much as you can. Navigating to kubernetes documentation everytime can consume a lot of your time. 

## Resources

https://medium.com/@nassim.kebbani/how-to-beat-kubernetes-ckad-certification-c84bff8d61b1

https://medium.com/chotot/tips-tricks-to-pass-certified-kubernetes-application-developer-ckad-exam-67c9e1b32e6e

https://medium.com/faun/kubectl-commands-cheatsheet-43ce8f13adfb

https://medium.com/@kgamanji/how-i-passed-my-ckad-with-97-6b54dcffa72f

https://medium.com/@iizotov/exam-notes-ckad-c1c4f9fb9e73

https://github.com/dgkanatsios/CKAD-exercises/blob/master/e.observability.md

https://github.com/twajr/ckad-prep-notes

https://www.linkedin.com/pulse/my-ckad-exam-experience-atharva-chauthaiwale/

https://docs.google.com/spreadsheets/d/1WPHt0gsb7adVzY3eviMK2W8LejV0I5m_Zpc8tMzl_2w/edit#gid=0


