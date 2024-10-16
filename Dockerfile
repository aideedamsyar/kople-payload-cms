# Use a lightweight Node.js base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies based on the package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy the rest of the application code
COPY . .

# Build the Payload CMS application
RUN npm run build

# Expose the port Payload will use
EXPOSE 3000

# Start Payload CMS in production mode
CMD ["npm", "start"]