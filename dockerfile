# Use Node.js official image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start your app
CMD ["node", "index.js"]  # or your main file name
