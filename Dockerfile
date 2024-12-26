# Use Node.js 18 Alpine base image
FROM node:18-alpine

# Expose the application port
EXPOSE 3000

# Set working directory
WORKDIR /app

# Set production environment variable
ENV NODE_ENV=production

# Install necessary tools and OpenSSL for Prisma compatibility
RUN apk add --no-cache \
    openssl \
    sqlite \
    && apk update

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies, omitting development dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Remove CLI packages not required in production
RUN npm remove @shopify/cli

# Copy the application code
COPY . .

# Generate Prisma Client (ensure necessary binaries are downloaded)
RUN npx prisma generate

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "docker-start"]
