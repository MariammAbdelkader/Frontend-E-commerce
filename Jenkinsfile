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
                sh "make build IMAGE_NAME=${IMAGE_NAME}"   
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
                echo 'Stopping any running container...'
               sh "make down CONTAINER_NAME=frontend-app"

                echo 'Starting application using Makefile...'
                sh "make up IMAGE_NAME=${IMAGE_NAME} CONTAINER_NAME=frontend-app"
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
            sh "make down IMAGE_NAME=${IMAGE_NAME}"
        }
        success {
            echo 'Pipeline executed successfully!'
        }
    }
}
