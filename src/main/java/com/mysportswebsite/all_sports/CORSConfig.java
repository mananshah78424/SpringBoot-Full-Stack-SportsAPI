package com.mysportswebsite.all_sports;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://your-frontend-app.railway.app") // Add your frontend URL here
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // Allow the HTTP methods you need
    }
}
