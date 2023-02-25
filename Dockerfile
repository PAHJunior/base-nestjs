# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

ENV NODE_ENV=$NODE_ENV

# If environment is "development", set the environment variable and run the development command
RUN if [ "$NODE_ENV" = "development" ]; then \
  npm run build && \
  npm install --only=development; \
  fi

# Expose the port
EXPOSE 3000

# Set the command to run
CMD [ "npm", "start" ]
