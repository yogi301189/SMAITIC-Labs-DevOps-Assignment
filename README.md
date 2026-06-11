# SMAITIC Labs DevOps Assignment

## Career Objective

To build reliable, secure, and scalable cloud infrastructure using DevOps practices while continuously improving automation, monitoring, and deployment processes.

---

## Overview

This repository contains my solution for deploying a simple stateless Node.js API in a Kubernetes environment.

The assignment covers:

* Dockerizing the application
* Creating a Jenkins CI/CD pipeline
* Deploying the application using Helm
* Configuring monitoring with Prometheus ServiceMonitor
* Applying basic security and operational best practices

---

## Architectural Decisions

While working on this assignment, I focused on keeping the solution simple, maintainable, and close to real-world deployment practices.

### Helm

I chose Helm instead of writing standalone Kubernetes manifests because it makes configuration management easier and supports reusable deployments across environments.

### Docker

The application is packaged as a Docker container to ensure consistency between development, testing, and deployment environments.

A lightweight Node.js Alpine image was used to reduce image size and startup time.

### Security

A few basic security practices were included:

* Running the container as a non-root user
* Limiting resource consumption using CPU and memory requests/limits
* Keeping the container image simple and minimal

### Reliability

To improve application availability:

* Readiness probes were configured
* Liveness probes were configured
* A dedicated `/health` endpoint was added

### Monitoring

A Prometheus ServiceMonitor resource was included so the application can be monitored through Prometheus and visualized in Grafana.

### Logging

Application logs are written to standard output, which allows Kubernetes logging solutions such as Fluent Bit or Logstash to collect and forward logs to centralized platforms like Elasticsearch.

---

## Application

The sample application is a simple Node.js Express API exposing the following endpoints:

| Endpoint   | Description                              |
| ---------- | ---------------------------------------- |
| `/`        | Main application endpoint                |
| `/health`  | Health check endpoint                    |
| `/metrics` | Metrics endpoint for Prometheus scraping |

---

## Docker Improvements

The original Dockerfile worked, but a few changes were made to make it more suitable for production-style deployments.

Changes include:

* Using a specific Node.js version instead of a generic image
* Using an Alpine-based image
* Installing dependencies with `npm ci`
* Running the application as a non-root user
* Exposing only the required port
* Keeping the image structure clean and easy to maintain

These changes help improve security, consistency, and image size.

---

## CI/CD Pipeline

A Jenkins pipeline was created to automate the deployment process.

### Pipeline Stages

1. Source Code Checkout
2. Dependency Installation
3. Application Testing
4. Docker Image Build
5. Docker Image Push
6. Helm Deployment

The pipeline is intentionally simple and can be extended with additional stages such as security scanning, quality gates, or approval workflows.

---

## Kubernetes Deployment

The application is deployed using a Helm chart.

### Included Resources

* Deployment
* Service
* Ingress
* ServiceMonitor

The application listens on port `3000`, and the service port is named `api-web` as required in the assignment.

---

## Monitoring

Monitoring is enabled through a Prometheus ServiceMonitor resource.

Prometheus can scrape metrics from:

```text
/metrics
```

The collected metrics can be visualized in Grafana dashboards.

Typical dashboards may include:

* Request count
* Error rate
* Response latency
* Application availability

---

## Logging

Application logs are written to standard output.

In a Kubernetes environment, these logs can be collected by Fluent Bit or Logstash and forwarded to Elasticsearch for storage and analysis.

Kibana can then be used for searching and visualizing logs.

---

## Security Considerations

The following security-related measures were included:

* Non-root container execution
* CPU and memory limits
* Readiness probes
* Liveness probes
* Immutable container images
* Separation of application configuration from code

For a production environment, additional controls such as image scanning, RBAC, secrets management, and network policies should also be considered.

---

## Assumptions

The following assumptions were made while completing the assignment:

* An EKS cluster already exists
* Jenkins is already available
* Prometheus Operator is installed
* Container registry credentials are configured in Jenkins
* NGINX Ingress Controller is available in the cluster

---

## Setup Instructions

### Build the Docker Image

```bash
docker build -t node-api:v1 .
```

### Run the Application

```bash
docker run -d -p 3001:3000 --name node-api node-api:v1
```

### Verify the Application

```bash
curl localhost:3001
curl localhost:3001/health
```

### Validate the Helm Chart

```bash
helm lint helm/node-api

helm template node-api helm/node-api
```

---

## Repository Structure

```text
.
├── Dockerfile
├── Jenkinsfile
├── README.md
├── package.json
├── app.js
└── helm
    └── node-api
        ├── Chart.yaml
        ├── values.yaml
        └── templates
            ├── deployment.yaml
            ├── service.yaml
            ├── ingress.yaml
            └── servicemonitor.yaml
```

---

## Conclusion

This assignment demonstrates a basic DevOps workflow using Docker, Jenkins, Helm, and Kubernetes. The goal was not to build a complex platform, but to show how a simple Node.js application can be packaged, deployed, monitored, and managed using common DevOps tools and practices.
