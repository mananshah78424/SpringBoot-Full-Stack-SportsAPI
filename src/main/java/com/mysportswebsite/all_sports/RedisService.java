package com.mysportswebsite.all_sports;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.Serializable;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    @Value("${redis.cache.expiration.seconds:3600}")
    private long cacheExpiration; // Cache expiration time in seconds

    public RedisService(RedisTemplate<String, Object> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public <T> T get(String key, Class<T> type) {
        System.out.println("Trying to get value");
        try {
            Object value = redisTemplate.opsForValue().get(key);
            if (value == null) {
                System.out.println("No value found for key: " + key);
                return null;
            }
            return objectMapper.convertValue(value, type);
        } catch (RedisConnectionFailureException e) {
            System.out.println("Redis connection failed during get operation, key: " + key);
            e.printStackTrace(); // Print the stack trace to standard output
            return null; // Optionally, you could return a default value or handle differently
        } catch (Exception e) {
            System.out.println("Unexpected error during get operation, key: " + key);
            e.printStackTrace(); // Print the stack trace to standard output
            return null; // Optionally, you could return a default value or handle differently
        }
    }

    public void set(String key, Serializable value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            redisTemplate.expire(key, cacheExpiration, java.util.concurrent.TimeUnit.SECONDS);
            System.out.println("Successfully set key: " + key + " with expiration time: " + cacheExpiration + " seconds");
        } catch (RedisConnectionFailureException e) {
            System.out.println("Redis connection failed during set operation, key: " + key);
            e.printStackTrace(); // Print the stack trace to standard output
        } catch (Exception e) {
            System.out.println("Unexpected error during set operation, key: " + key);
            e.printStackTrace(); // Print the stack trace to standard output
        }
    }
}
