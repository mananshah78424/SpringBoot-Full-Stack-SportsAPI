## Use an official OpenJDK 21 runtime as a parent image
#FROM openjdk:21-jdk-slim
#
## Install bash and other necessary packages
#RUN apt-get update && apt-get install -y bash libc6-dev
#
#
#
#WORKDIR /app
#COPY target/all-sports-0.0.1-SNAPSHOT.jar /app/app.jar
#
#CMD ["java", "-jar", "app.jar"]
# Use an official OpenJDK 21 runtime as a parent image for building the JAR
# Use an official Maven image with Eclipse Temurin 17 as a parent image for building the JAR
FROM maven:3.9-eclipse-temurin-21-alpine as builder

# Set the working directory for the build process
WORKDIR /app

# Copy the pom.xml and source code into the container
COPY pom.xml ./
COPY src ./src

RUN ls -al


# Build the project and package it as a JAR
RUN mvn clean package -DskipTests

# Use a lighter OpenJDK image to run the application
FROM eclipse-temurin:21-jre-jammy

# Set the working directory for the runtime
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=builder /app/target/all-sports-0.0.1-SNAPSHOT.jar /app/app.jar

# Run the JAR file
CMD ["java", "-jar", "app.jar"]
