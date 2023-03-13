# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ../../package.json .

RUN ls
# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=development

# Expose the port
EXPOSE ${PORT}

# Start the application
CMD ["npm", "start"]
