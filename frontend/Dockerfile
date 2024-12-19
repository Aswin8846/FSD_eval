# Use an official Node.js 16 image as the base
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy the app files
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 80

# Run the app
CMD ["npm", "start"]