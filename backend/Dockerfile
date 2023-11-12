# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory IN/OF the container. So this is where you go when you go into the container
WORKDIR /usr/src/app    

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Make port available to the world outside this container
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "server.js" ]
