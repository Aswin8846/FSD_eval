# Start from the official Golang image as a base
FROM golang:1.23.4-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go mod and sum files to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the Go source code into the container and build the application
COPY . .
RUN go build -o main

# Start a new stage with a minimal Alpine image
FROM alpine:latest
WORKDIR /app

# Install bash and wget to download wait-for-it script
RUN apk add --no-cache bash wget

# Add wait-for-it script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Copy the compiled binary from the previous stage
COPY --from=builder /app/main .

# Expose the port the app runs on
EXPOSE 8080

# Use wait-for-it.sh to wait for the database to be ready before starting the app
CMD ["wait-for-it.sh", "db:3306", "--", "./main"]
