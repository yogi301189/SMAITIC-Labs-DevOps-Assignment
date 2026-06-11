Career Objective
To build reliable, secure and scalable cloud infrastructure using DevOps practices and cloud-native technologies while continuously learning and improving automation, monitoring and deployment processes.
SMAITIC Labs DevOps Assignment
Overview
This repository contains the solution for deploying a simple stateless Node.js API in a production-oriented Kubernetes environment.
The assignment includes:
•	Improved production-ready Dockerfile
•	Jenkins CI/CD pipeline
•	Helm chart for Kubernetes deployment
•	Monitoring configuration using Prometheus ServiceMonitor
•	Basic production security and operational considerations
Architectural Decisions
The solution was designed with simplicity, maintainability and production-readiness in mind.
•	Helm was selected instead of standalone Kubernetes manifests because it provides better configuration management, easier upgrades and simplified deployment across environments.
•	The application is packaged as a Docker container to ensure consistency between development, testing and deployment environments.
•	A lightweight Node.js Alpine image was used to reduce image size and improve deployment efficiency.
•	The container runs as a non-root user to follow basic container security best practices.
•	Resource requests and limits were configured to prevent uncontrolled CPU and memory consumption within the cluster.
•	Readiness and liveness probes were added to improve application availability and support automated recovery from unhealthy states.
•	The application exposes a dedicated health endpoint (/health) for Kubernetes health checks.
•	Monitoring support was included through a Prometheus ServiceMonitor resource, allowing the application to be integrated with Prometheus and Grafana.
•	Application logs are written to standard output, allowing Kubernetes logging agents to collect and forward logs to the ELK stack.
•	Jenkins was chosen as the CI/CD platform as specified in the assignment requirements, with pipeline stages covering build, test and deployment activities.

Application
The sample application is a lightweight Node.js Express API exposing the following endpoints:
•	/ - Application endpoint
•	/health - Health check endpoint
•	/metrics - Placeholder metrics endpoint for Prometheus scraping
Docker Improvements
The provided Dockerfile was functional but not suitable for production usage.
The following improvements were made:
•	Replaced generic image usage with a specific Node.js version
•	Used a lightweight Alpine-based image
•	Installed dependencies using npm ci
•	Configured a dedicated non-root application user
•	Exposed only the required application port
•	Kept the image structure simple and maintainable
These changes improve security, consistency and image size.
CI/CD Pipeline
A Jenkins pipeline was created to automate the deployment workflow.
Pipeline stages:
1.	Source Code Checkout
2.	Dependency Installation
3.	Application Testing
4.	Docker Image Build
5.	Image Push Stage
6.	Helm Deployment Stage
The pipeline is intentionally simple and can be extended with additional quality gates, security scanning and approval workflows.
Kubernetes Deployment
A Helm chart was created instead of standalone manifests.
Reason for choosing Helm:
•	Easier configuration management
•	Better reusability
•	Environment-specific customization through values
•	Simplified upgrades and rollbacks
The chart includes:
•	Deployment
•	Service
•	Ingress
•	ServiceMonitor
The application container exposes port 3000 with the port name api-web as required.
Monitoring
Prometheus monitoring is enabled through a ServiceMonitor resource.
Prometheus can scrape application metrics from the /metrics endpoint.
Grafana can be configured to visualize:
•	Request count
•	Error rates
•	Response latency
•	Application availability
Logging
Application logs are written to standard output.
In a Kubernetes environment, logs can be collected using Fluent Bit or Logstash and forwarded to Elasticsearch.
Kibana can then be used for searching and visualizing application logs.
Security Considerations
The following security measures were included:
•	Non-root container execution
•	Resource requests and limits
•	Readiness probes
•	Liveness probes
•	Immutable container images
•	Separation of configuration from application code
In a production environment, additional controls such as image scanning, RBAC, secrets management and network policies should also be implemented.
Assumptions
The following assumptions were made while completing the assignment:
•	EKS cluster already exists and is accessible
•	Jenkins server is already available
•	Prometheus Operator is installed in the cluster
•	Container registry credentials are configured in Jenkins
•	NGINX Ingress Controller is available in the cluster
Setup Instructions
Build Docker Image
docker build -t node-api:v1 .
Run Application
docker run -d -p 3001:3000 --name node-api node-api:v1
Verify Application
curl localhost:3001
curl localhost:3001/health
Validate Helm Chart
helm lint helm/node-api
helm template node-api helm/node-api
Repository Structure
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
Conclusion
This implementation focuses on creating a simple but production-oriented deployment approach for a stateless Node.js microservice using Docker, Jenkins, Helm and Kubernetes while keeping the solution easy to understand and maintain.
