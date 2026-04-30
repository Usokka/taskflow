# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's code
COPY . ./

# Make port 5173 available to the world outside this container
# This is the default port for Vite
EXPOSE 5173

# Run the app when the container launches
# We use --host to expose the server to the network
CMD ["npm", "run", "dev", "--", "--host"]
