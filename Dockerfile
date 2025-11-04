# Use Ubuntu as the base image
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js 20 and necessary tools
RUN apt update && \
    apt upgrade -y && \
    apt install -y curl git imagemagick openssh-client ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt install -y nodejs && \
    npm install -g npm && \
    rm -rf /var/lib/apt/lists/*

# Working directory within the container
WORKDIR /app

# Copy all the files in your project
COPY . .

# Install dependencies (including cfonts) on startup
CMD npm install cfonts && npm install && node index.js 
