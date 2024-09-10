package com.mysportswebsite.all_sports;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.Serializable;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    @Value("${redis.cache.expiration.seconds:3600}")
    private long cacheExpiration;

    public RedisService(RedisTemplate<String, Object> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public <T> T get(String key, Class<T> type) {
        Object value = redisTemplate.opsForValue().get(key);
        if (value == null) {
            return null;
        }
        try {
            return objectMapper.convertValue(value, type);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Failed to deserialize from Redis", e);
        }
    }

    public void set(String key, Serializable value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public boolean ping() {
        try (RedisConnection connection = redisTemplate.getConnectionFactory().getConnection()) {
            connection.ping(); // Ping Redis server
            System.out.println("REDIS CONENCTED");
            return true;
        } catch (Exception e) {
            System.out.println("REDIS NOT CONNECTED");
            return false;
        }
    }
}
