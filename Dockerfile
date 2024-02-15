# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory
WORKDIR /app

# Install app dependencies
COPY ./package*.json ./
RUN npm install

# Copy your application code into the container
COPY . .

RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
