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



# Designing Highly Available Kubernetes Application

```
Server https://masters.tcx.non-prod.ichp.asia.ing.net:443
openshift v3.9.0+2e78773-56
kubernetes v1.9.1+a0ce1bc657

Server https://masters.tcx.non-prod.wright.ichp.asia.ing.net:443
openshift v3.11.317
kubernetes v1.11.0+d4cacc0
```

This case study is focused on achieving high availability of an application running in Kubernetes by combining features of Kubernetes

1. PodDisruptionBudget   `v1.5 beta`
2. podAntiAffinity
3. topologySpreadConstraints  `v1.19 stable`
4. RollingUpdateStrategy
5. HorizontalPodAutoScaler 
6. PodPriority `1.8 alpha`



### RollingUpdateStrategy



### Pod Disruption Budget

PodDisruptionBudget allows higher application availability by protecting pods from being evicted. This can be achieved by creating PodDisruptionBudget object

