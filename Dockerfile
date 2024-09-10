# Use an official OpenJDK 21 runtime as a parent image
FROM openjdk:21-jdk-slim

# Install bash and other necessary packages
RUN apt-get update && apt-get install -y bash libc6-dev



WORKDIR /app
COPY target/all-sports-0.0.1-SNAPSHOT.jar /app/app.jar

CMD ["java", "-jar", "app.jar"]
