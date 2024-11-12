# Start with a Deno 2 image as the base
FROM denoland/deno:alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the application code
COPY . .

# Install npm dependencies
RUN deno task build

# Create a separate stage for serving
FROM denoland/deno:alpine AS serve

# Set the working directory in the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/deno.json ./deno.json

# Expose the port on which the app will be served
EXPOSE 8000

# Run the app with Deno's built-in server
CMD ["deno", "task", "serve"]
