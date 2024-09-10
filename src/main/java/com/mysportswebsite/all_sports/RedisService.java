package com.mysportswebsite.all_sports;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.Serializable;

@Service
public class RedisService {

    private static final Logger logger = LoggerFactory.getLogger(RedisService.class);

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    @Value("${redis.cache.expiration.seconds:3600}")
    private long cacheExpiration;

    public RedisService(RedisTemplate<String, Object> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public <T> T get(String key, Class<T> type) {
        try {
            Object value = redisTemplate.opsForValue().get(key);
            if (value == null) {
                return null;
            }
            return objectMapper.convertValue(value, type);
        } catch (RedisConnectionFailureException e) {
            logger.warn("Redis connection failed during get operation, key: {}", key, e);
            return null; // Return null if Redis connection fails
        } catch (Exception e) {
            logger.error("Unexpected error during get operation, key: {}", key, e);
            return null; // Return null if an unexpected error occurs
        }
    }

    public void set(String key, Serializable value) {
        try {
            redisTemplate.opsForValue().set(key, value);
        } catch (RedisConnectionFailureException e) {
            logger.warn("Redis connection failed during set operation, key: {}", key, e);
        } catch (Exception e) {
            logger.error("Unexpected error during set operation, key: {}", key, e);
        }
    }
}
