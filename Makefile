# Specify Docker image name for the Frontend
IMAGE_NAME=my-frontend-app

# Build the Docker image using Dockerfile
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
up:
	docker run -d --name $(IMAGE_NAME) -p 3001:80 $(IMAGE_NAME)

# Stop and remove the Docker container
down:
	docker stop $(IMAGE_NAME) && docker rm $(IMAGE_NAME)

# Clean up unused Docker images and containers
clean:
	docker system prune -f

# Restart the container (stop, build, and run again)
restart:
	make down
	make up
