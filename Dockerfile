# Use an official Node.js image as the base for the build stage
FROM node:alpine as build

# Copy only the package.json file to the container to take advantage of Docker's caching
COPY package*.json ./

# Install dependencies, this will be cached if package.json hasn't changed
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the build command
RUN npm run build-only

# Use an official Nginx image as the base for the production stage
FROM nginx:stable-alpine

# Copy the built application from the build stage to the production stage
COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx with the daemon off
CMD ["nginx", "-g", "daemon off;"]
