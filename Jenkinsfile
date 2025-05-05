pipeline {
    agent any

    environment {
        IMAGE_NAME = "mariammohamed1112/frontend-app"
        MAKEFILE_PATH = "Makefile"
        AWS_BUCKET = "shophoria"
        AWS_REGION = "us-east-1" // change if you're using a different region
        CLOUDFRONT_DISTRIBUTION_ID = "E2A8QWZNYVB2O1"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build React App') {
            steps {
                echo 'Installing dependencies and building React app...'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Upload to S3') {
            steps {
                echo 'Uploading build files to S3 bucket...'
                withCredentials([usernamePassword(credentialsId: 'aws-credentials', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                        aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                        aws configure set default.region ${AWS_REGION}
                        aws s3 sync build/ s3://${AWS_BUCKET}/ --delete
                    '''
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                echo 'Invalidating CloudFront cache...'
                withCredentials([usernamePassword(credentialsId: 'aws-credentials', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                        aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                        aws configure set default.region ${AWS_REGION}
                        aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "make build IMAGE_NAME=${IMAGE_NAME}"   
                sh 'docker images'
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
                sh "docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:latest"
                sh "docker push ${IMAGE_NAME}:latest"
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
            sh 'docker logs $(docker ps -lq)'
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
