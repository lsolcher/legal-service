# Use a Node.js base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY app .

# Build the Remix app
RUN npm run build

# Expose the port Remix uses
EXPOSE 3000

# Set the command to start the Remix app
CMD ["npm", "start"]
