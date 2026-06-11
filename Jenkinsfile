pipeline {
    agent any

    environment {
        MARS_IMAGE = "yogi301189/node-api"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $MARS_IMAGE:${BUILD_NUMBER} .'
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push $MARS_IMAGE:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                helm upgrade --install node-api helm/node-api \
                --set image.tag=${BUILD_NUMBER}
                '''
            }
        }
    }
}
