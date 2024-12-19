# Build stage
# Use a lightweight Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Serve stage
# Use a lightweight NGINX image to serve the built files
FROM nginx:1.27-alpine

# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 for the container
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
