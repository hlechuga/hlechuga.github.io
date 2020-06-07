---
title: Review Notes
author: Cotes Chung
date: 2019-08-08 11:33:00 +0800
categories: ["", Blogs]
tags: [typography]
math: true
---

# AWS

AWS offers cloud computing services, developments tools, and enterprise solutions that helps businesses scale and grow fast.

## AWS cloud computing solutions:

### Compute

EC2 - virtual machines on cloud

AWS Lambda - serverless solutions that allow to run functions whenever you need. 

EKS - managed Kubernetes platform

Beanstalk - automated deployment of resources for scalable web application

VPC - private networking of cloud resources

- Vnet
- Subnet
- CIDR
- VPN
- Routes
- Gateway
- Availability Zones

CloudFormation - Infratructure as a code

### Storage

S3 - simple storage service

EBS - block storage

Glacier - low cost, data archiving storage technology

 Storage gateway - storage for on-premise applications

### Database

Amazon RDS - easy to setup, operate, scalable relational database

DynamoDB - NoSQL database

ElasticCache - in-memory cache solution

RedShift - Data warehousing solution. Offers Complex OLAP (Online Analytical Processing) features. Analyze information from multiple databases. 

### Security

IAM - helps manage users and groups, assign policies and rules. 

WAP - Web application Firewall 

KMS - Key Management service - helps create and control encryption keys and encrypt data. 

### Migration

Snowball - allows to transfer terabytes of data inside and outside of AWS. 

SMS (Server Migration Service) -  allows to migrate on-site servers to AWS

### Analytics and Big Data

Athena, CloudSearch, ElasticSearch, Kinesis, QuickSight, EMR(Elastic Map Reduce)

### Management Services

CloudWatch - monitors AWS resources like EC2, RDS. It triggers alarm depends on various metrics.

CloudFormation - IaaC (Infrastructure as a code) solution like Terraform but only focused on AWS

CloudTrail - used for auditing and logging AWS resources

OpsWorks - autoamate configurations on AWS enviroments

Service Catalog, Config, AWS Auto Scaling, System Manager

### Developer Tools

CodeStar, CodeCommit, CodeBuild, CodeDeploy, CodePipeline, Cloud9

### Internet of Thing

IoT Core, IoT Device management, IoT Analytics, Amazon FreeRTOS

### Application Services, Mobile Services, Business Productivity, AI, AR & VR, Game Development, etc

# Docker

Docker is container technology developed by Docker Inc. Docker uses linux kernel features like linux namespaces and control groups(cgroups) to create containers. 

Linux Namespaces

- pid namespaces - this ensures that processes within one namespace are not aware of process in other namespaces
- net namespaces - Isolation of the network interface controller, iptables, routing tables, and other lower level networking tools
- mnt namespaces - Filesystems are mounted, so that the file system scope of a namespace is limited to only the directories mounted
- user namespaces - Limits users within a namespace to only that namespace and avoids user ID conflicts across namespaces.

CGroups

Cgroups allow you to allocate resources — such as CPU time, system memory, network bandwidth, or combinations of these resources — among user-defined groups of tasks (processes) running on a system

Doker compose of docker client, docker server, and docker registry.

# Kubernetes

Kubernetes is a container orchestration solution. It enables automating deployments, scaling, and managing containers. 

#### Control Plane Components

**apiserver** - control plane component that expose the kubernetes API

**etcd** - a key-value store used by kubernetes to store and backup all cluster data

 **kube-scheduler** - watches newly created pods with no assigned node yet. Handles all scheduling conditions

**kube-controller-manager**  - manage all controller processes such as replication controller, node controller, endpoints controller, SA and token controller. 

**cloud-controller-manager** - interact with the cloud provider. It is still in alpha feature. It manage controller such as node controller, route controller, service controller, and volume controller. 

####  Node Components

kubelet  - agent that runs on each nodes. It make sure the containers are running in the pods.

kube-proxy - is a network proxy that runs on each nodes in the cluster, implementing the Service object

Container runtime - responsible for running the containers. Supports Docker, containerd, CRI-O. 

#### Addons

DNS - DNS server for kubernetes services. 

Kubernetes Dashboard (Web UI) - dashboard for kubernetes cluster used to monitor, manage, troubleshoot applications running in the cluster. 

Container Resource Monitoring - records generic time-series metrics about container. 

Cluster level logging - resposible for saving container logs to central logging storage. 



#### Kubernetes Objects

Pods - Basic component of Kubernetes. It can be a single container or multi-container. Pods can define volumes, get secrets or configmaps, expose ports, define serviceaccount. Pods can have its controller base on use cases which are;

- ReplicaSet and ReplicationController -  maintain stable number of Pods are running to provide scalabilty, reliability and availabilty. Usually used by deployment.
- Deployment - provides declarative updates for pods and replicasSet. Deployments can define to create new replicaSet. Deployments makes it easy to deploy, scale up, rollback, pause deployment of pods. 
- StefulSets - used to manage staful applications. It maintains sticky identity for each pods to achieve persistency. Storage must be provisioned by PersistentVolume.
- DaemonSets - ensure that all nodes run a copy of a pod. It ensures to have an equal copy of pods per nodes. 
- Job - used to complete certain task. Job can create on or more pods based on your use cases. After a job was completed it will terminate all that pods. 
- Cronjob - create job on a time-based schedule. Works like crontab. Schedule are written in Cron format

Service - used expose the pods as one network service.  Service identifies set of pods based on selector. Service without selector can be used for other components. 

- ClusterIP - expose the service in cluster-internal IP. clusterIP is only reachable within cluster
- NodePort - expose the service on each node IP with static port. NodePort is reachable outside cluster by hitting `<nodeIP>:<NodePort>`
- LoadBalancer - expose the service externally using cloud provider's load balancer.
- ExternalName - expose the service by CNAME record. Uses Kube-dns. 

Endpoints - endpoints are automatically created by service to map pods IP addresses. You can define and manually create endpoints

Ingress - expose the services outside the cluster from HTTP and HTTPS routes. Ingress can be configured the give services externally-reachable URLs, load balance traffic.

NetworkPolicy - used to allow or deny communication to and from a group of pods and other network entities. 

Volumes - is attached to the container on the pod. Volumes ceases to exist when pods died too. There are many types of volume that can be created to pods. `volumeMounts` mounts the volume to the container.

- emptyDir - just a empty directory
- hostPath - use the directory path of the hosted node. 
- configMap - uses the configmap object as volume
- secretMap - uses the secrets object as volume
- persistentVolumeClaim - attach the persistent volume to the container. 
- cloud provided volumes - awsElasticBlockStore, azureDisk, azureFile, cephfs, glusterfs,gitRepo, vsphereVolume,etc

PersistentVolume - is a piece of storage in the cluster provisioned  manually by administrators or dynamically provisioned using StorageClass.

PersistentVolumeClaims - consumes the persistent volumes to be used by pods.  

StorageClass - provides way to describe the classes of storage. 

configMaps - used to store configurations

Secrets - used to store and mange sensitive information 

### Kubernetes Pattern

##### Foundational Pattern

Predictable Demands, Declarative Deployments, Health Probe, Managed Lifecycle, Automated Placement

##### Behavioral Pattern

Batch job, periodic job, Daemon Service, Singleton Serivce, Service Discovery, Self Awareness

##### Structural Pattern

Init Container, Sidecar, Adapter, Ambassador

##### Configuration Pattern

envVar Configuration, Configuration resource, immutable configuration, configuration template.

##### Advanced Patterns

Controller, Operator, Elastic Scale, Image builder

# Istio

Istio is a service mesh implementation to kubernetes. Service mesh means a network for microservices. 

Istio implements sidecar proxy that intercept all network communication between microservices.

Istio offers traffic management, security, policies and observability for microservices. 

![image-20200225173525721](Review Notes.assets/image-20200225173525721.png)

#### Istio Control Plane

Pilot - Pilot provides service discovery for the Envoy sidecars, traffic management capabilities for intelligent routing (e.g., A/B tests, canary rollouts, etc.), and resiliency (timeouts, retries, circuit breakers, etc.).

Mixer - platform-independent component that enforces access control and usage policies across the service mesh, and collects telemetry data from the Envoy proxy and other services. 

Mixer adapter - allow Istio to interface to a variety of infrastructure backends for such things as metrics and logs.

Citadel - enables strong service-to-service and end-user authentication with built-in identity and credential management. You can use Citadel to upgrade unencrypted traffic in the service mesh. 

Galley - is Istio’s configuration validation, ingestion, processing and distribution component. It is responsible for insulating the rest of the Istio components from the details of obtaining user configuration from the underlying platform (e.g. Kubernetes)



#### Traffic Management

##### Istio Networking Objects

Virtualservice - lets you configure how requests are routed to a service within istio service mesh. I defines a set of traffic rules to apply when a host is addressed. 

DestinationRule - defines the policies that apply to the traffic intended for a service after routing

Gateway - a load balancer operating at the edge of the mesh receiving incoming and outgoing connections

ServiceEntry - Access/routes entries into the internal mesh. These entries could an external to the mesh (public API), or internal service but not part of internal mesh (VM talking to services)

Envoy Filter - provides mechanism to customize the Envoy configuration generated by Istio Pilot.

Sidecar - describe the configuration of sidecar proxy that mediates inbound and outbound communication 

##### Request Routing



#### Resiliency

Circuit breaking - ability to close the connection to service (total unavailibility) when certain amount of failure has occured (fast fail or retries), latency and redirect to other service

outlier detection - ability to detect unusual behavior or failure and evict unhealthy host. 

Retries and Timeouts - ability to 

Health checks

Fault injection

# Vagrant