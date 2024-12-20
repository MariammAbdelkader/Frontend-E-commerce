pipeline {
    agent any

    environment {
        IMAGE_NAME = "mariammohamed1112/frontend-app"
        MAKEFILE_PATH = "Makefile"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'make build'  
                sh 'docker images' // Verify the image build
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin' // Login to Docker Hub
                }
                sh "docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:latest" // Tag the image
                sh "docker push ${IMAGE_NAME}:latest" // Push the image
            }
        }

        stage('Start Application') {
            steps {
                echo 'Starting application using Makefile...'
                sh 'make up' 
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
            sh 'docker logs $(docker ps -lq)' // Display container logs
        }
        failure {
            echo 'Pipeline failed. Cleaning up resources...'
            sh 'make down'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
    }
}
