# Use an official Node runtime as a parent image
FROM node:20-slim

# Create app directory
WORKDIR /app

# Copy package files first for Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies (production only is fine for runtime; dev deps needed for build)
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port your server listens on
EXPOSE 3000

# Start the custom server using tsx
CMD ["npx", "tsx", "server.ts"]
