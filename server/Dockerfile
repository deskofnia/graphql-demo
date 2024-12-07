# Use the official Node.js 20 image
FROM node:20

# Set the working directory in the container
WORKDIR /home/graphql/

# Copy package files first for caching
COPY package.json /home/graphql/

# Install dependencies
RUN npm install

# Copy the application code
COPY tsconfig.json /home/graphql/
COPY server.ts /home/graphql/

# Expose the application port
EXPOSE 4000

# Define the start command
CMD ["npm", "start"]