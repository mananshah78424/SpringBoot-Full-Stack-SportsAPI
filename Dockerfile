# Use an official OpenJDK 21 runtime as a parent image
FROM openjdk:21-jdk-slim

# Install necessary packages including bash, libc6-dev, wget, unzip, and Chrome
RUN apt-get update && apt-get install -y \
    bash \
    libc6-dev \
    wget \
    unzip \
    curl \
    gnupg && \
    # Install Google Chrome
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /usr/share/keyrings/google-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/google-archive-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && apt-get install -y google-chrome-stable && \
    # Install ChromeDriver
    CHROMEDRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE) && \
    wget -N https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip -d /usr/local/bin/ && \
    rm chromedriver_linux64.zip && \
    # Set permissions for ChromeDriver
    chmod +x /usr/local/bin/chromedriver && \
    # Clean up to reduce image size
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/all-sports-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port that your Spring Boot app will run on
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
