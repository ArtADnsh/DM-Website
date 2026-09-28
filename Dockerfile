# Stage 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package management files first for optimal layer caching
COPY Front-end/package*.json ./

# Install project dependencies
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the frontend source code
COPY Front-end/ ./

# Build production assets
RUN npm run build

# Stage 2: Serve stage using Nginx
FROM nginx:alpine-slim

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Container health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
