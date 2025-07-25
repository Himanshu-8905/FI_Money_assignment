# --- Build Stage ---
# Use a Node.js image to build the static files
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the project for production
# This creates a 'dist' folder with the static files
RUN npm run build

# --- Production Stage ---
# Use a lightweight Nginx server to serve the static files
FROM nginx:stable-alpine

# Copy the built static files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
# This is needed to handle client-side routing for a Single Page Application (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# The default Nginx command will start the server
CMD ["nginx", "-g", "daemon off;"]
