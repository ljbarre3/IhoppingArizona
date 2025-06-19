# Use a lightweight JDK image
FROM eclipse-temurin:17-jdk-alpine

# Create working directory inside container
WORKDIR /app

# Copy your app source code into the container
COPY . ./

# Build the Spring Boot JAR using Gradle
RUN ./gradlew bootJar --no-daemon

# Tell Docker how to start the app
CMD ["java", "-jar", "build/libs/IhopArizona-0.0.1-SNAPSHOT.jar"]