---
title: Kubernetes RBAC Service Account for Deploying Application in CICD
author: Harrold Lechuga
date: 2019-08-10	
categories: ["", Tutorials]
tags: [kubernetes, cicd]
status: publish
toc: true
image: https://miro.medium.com/max/1200/1*s2OHCGlh-XH87ZT9xW2e0A.png
---



# Kubernetes RBAC Service Account for Deploying Application in CI/CD

RBAC or Role-based Access Control is one of Kubernetes Authorization method. It composed of a `roles` that defines the permission, a `user`,`group` or `service account` , and a `rolebinding`

### Role

A role essentially maps a name to a set of permissions that a user or service is allowed to perform on the cluster. Roles can be scoped to the entire cluster with the `ClusterRole` resource type, or to a specific namespace with the `Role` resource type.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: deployer-role
  namespace: test-cluster
rules:
  # Services
  - apiGroups: [""]
    resources: ["services"]
    verbs: ["get", "watch", "list", "create", "update", "delete"]
  # Deployments
  - apiGroups: ["extensions", "apps"]
    resources: ["deployments", "replicasets"]
    verbs: ["get", "watch", "list", "create", "update", "delete"]
  # Pods
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "watch", "list"]
  # Jobs & Cronjobs
  - apiGroups: ["batch"]
    resources: ["cronjobs", "jobs"]
    verbs: ["get", "watch", "list", "create", "update", "delete"]
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["get", "watch", "list"]
  # Daemonsets
  - apiGroups: ["apps"]
    resources: ["daemonsets"]
    verbs: ["get", "watch", "list", "create", "update", "delete"]
  # Stateful sets
  - apiGroups: ["apps"]
    resources: ["statefulsets"]
    verbs: ["get", "watch", "list","create", "update", "delete"]
  # Configmaps
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "watch", "list", "create", "update", "delete"]

```



### RoleBinding

Rolebinding is used to bind a certain role to a user, group, or service account

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: deployer-role-binding
  namespace: test-cluster
subjects:
- kind: User
  name: deployer
  namespace: test-cluster
roleRef:
  kind: Role
  name: deployer-role
  apiGroup: rbac.authorization.k8s.io
```



### KubeConfig.sh

```bash
#!/bin/sh

  SERVICE_ACCOUNT=$1
  NAMESPACE=$2
  SERVER=$3

  SERVICE_ACCOUNT_TOKEN_NAME=$(oc -n ${NAMESPACE} get serviceaccount ${SERVICE_ACCOUNT} -o jsonpath='{.secrets[].name}' --insecure-skip-tls-verify=true)
  SERVICE_ACCOUNT_TOKEN=$(oc -n ${NAMESPACE} get secret ${SERVICE_ACCOUNT_TOKEN_NAME} -o "jsonpath={.data.token}" --insecure-skip-tls-verify=true | base64 --decode)
  SERVICE_ACCOUNT_CERTIFICATE=$(oc -n ${NAMESPACE} get secret ${SERVICE_ACCOUNT_TOKEN_NAME} -o "jsonpath={.data['ca\.crt']}" --insecure-skip-tls-verify=true)

  cat <<END
  apiVersion: v1
  kind: Config
  clusters:
  - name: default-cluster
    cluster:
      certificate-authority-data: ${SERVICE_ACCOUNT_CERTIFICATE}
      server: ${SERVER}
  contexts:
  - name: UAT
    context:
      cluster: test-cluster
      namespace: ${NAMESPACE}
      user: ${SERVICE_ACCOUNT}
  current-context: UAT
  users:
  - name: ${SERVICE_ACCOUNT}
    user:
      token: ${SERVICE_ACCOUNT_TOKEN}
  END
```

### KubeConfig

```yaml
 apiVersion: v1
  kind: Config
  clusters:
  - name: default-cluster
    cluster:
      certificate-authority-data: <ca cert>
      server: https://<cluster_url>:443
  contexts:
  - name: UAT
    context:
      cluster: test-cluster
      namespace: <namespace>
      user: <serviceaccount>
  current-context: UAT
  users:
  - name: <serviceaccount>
    user:
      token: <token>
```




