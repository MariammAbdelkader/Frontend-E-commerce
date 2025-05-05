# Specify Docker image name for the Frontend
IMAGE_NAME ?= my-frontend-app
CONTAINER_NAME ?= frontend-app
# Build the Docker image using Dockerfile
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
up:
	docker run -d --name $(CONTAINER_NAME) -p 8001:80 $(IMAGE_NAME)

# Stop and remove the Docker container
down:
	@docker ps -aq --filter "name=$(CONTAINER_NAME)" | grep -q . && docker rm -f $(CONTAINER_NAME) || echo "No container to remove"
# Clean up unused Docker images and containers
clean:
	docker system prune -f

# Restart the container (stop, build, and run again)
restart:
	make down IMAGE_NAME=$(IMAGE_NAME)
	make up IMAGE_NAME=$(IMAGE_NAME)
