# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY Backend-server.js ./

# Expose port 3000
EXPOSE 3000

# Start the backend server (fix: correct entry file)
CMD ["node", "Backend-server.js"]


