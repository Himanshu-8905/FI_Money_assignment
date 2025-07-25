# --- Base Stage ---
# Use an official Node.js runtime as a parent image.
# Using alpine for a smaller image size.
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# --- Dependencies Stage ---
# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install app dependencies
# Using --only=production to avoid installing devDependencies
RUN npm install --only=production

# --- Application Stage ---
# Bundle app source
COPY . .

# Your app binds to port 5000, so you need to expose it
EXPOSE 5000

# Define the command to run your app
CMD [ "npm", "start" ]
