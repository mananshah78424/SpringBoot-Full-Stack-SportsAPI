package com.mysportswebsite.all_sports.f1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysportswebsite.all_sports.RedisService;
import com.mysportswebsite.all_sports.f1.Classes.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class f1Service {

    @Value("${api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final RedisService redisService;

    @Autowired
    public f1Service(RestTemplate restTemplate, ObjectMapper objectMapper, RedisService redisService) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.redisService = redisService;
    }

    // Circuits
    public CircuitResponse getCircuits() {
        System.out.println("Getting circuits");
        String cacheKey = "circuits";
        try {
            CircuitResponse cachedResponse = redisService.get(cacheKey, CircuitResponse.class);
            System.out.println("Got cachedReponse, checking");
            if (cachedResponse != null) {
                System.out.println("Key for: " + cacheKey + " found!");
                return cachedResponse;
            }
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }

        System.out.println("Creating redis key for: " + cacheKey);
        String url = "https://v1.formula-1.api-sports.io/circuits";
        CircuitResponse response = fetchAndParse(url, CircuitResponse.class);
        try {
            redisService.set(cacheKey, response);
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }
        return response;
    }

    // Races
    public RaceResponse getRaces(Integer season, Integer next, String timezone, String type) {
        StringBuilder urlBuilder = new StringBuilder("https://v1.formula-1.api-sports.io/races?");
        if (season != null) {
            urlBuilder.append("season=").append(season).append("&");
        }
        if (timezone != null && !timezone.isEmpty()) {
            urlBuilder.append("timezone=").append(timezone).append("&");
        }
        if (type != null && !type.isEmpty()) {
            urlBuilder.append("type=").append(type).append("&");
        }
        if (next != null) {
            urlBuilder.append("next=").append(next).append("&");
        }
        String url = urlBuilder.toString();
        if (url.endsWith("&")) {
            url = url.substring(0, url.length() - 1);
        }

        String cacheKey = "races" + url;
        try {
            RaceResponse cachedResponse = redisService.get(cacheKey, RaceResponse.class);
            if (cachedResponse != null) {
                System.out.println("Key for: " + cacheKey + " found!");
                return cachedResponse;
            }
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }

        System.out.println("Creating redis key for: " + cacheKey);
        RaceResponse response = fetchAndParse(url, RaceResponse.class);
        try {
            redisService.set(cacheKey, response);
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }
        return response;
    }

    // Rankings
    public DriverRankingResponse getDriverRankings(int season) {
        String cacheKey = "driver-rankings-season-" + season;
        try {
            DriverRankingResponse cachedResponse = redisService.get(cacheKey, DriverRankingResponse.class);
            if (cachedResponse != null) {
                System.out.println("Key for: " + cacheKey + " found!");
                return cachedResponse;
            }
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }

        String url = String.format("https://v1.formula-1.api-sports.io/rankings/drivers?season=%d", season);
        DriverRankingResponse response = fetchAndParse(url, DriverRankingResponse.class);
        try {
            redisService.set(cacheKey, response);
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }
        return response;
    }

    public TeamRankingResponse getTeamRankings(int season) {
        String cacheKey = "team-rankings-season-" + season;
        try {
            TeamRankingResponse cachedResponse = redisService.get(cacheKey, TeamRankingResponse.class);
            if (cachedResponse != null) {
                System.out.println("Key for: " + cacheKey + " found!");
                return cachedResponse;
            }
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }

        String url = String.format("https://v1.formula-1.api-sports.io/rankings/teams?season=%d", season);
        TeamRankingResponse response = fetchAndParse(url, TeamRankingResponse.class);
        try {
            redisService.set(cacheKey, response);
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }
        return response;
    }

    // Teams
    public TeamResponse getTeams() {
        String cacheKey = "teams";
        try {
            TeamResponse cachedResponse = redisService.get(cacheKey, TeamResponse.class);
            if (cachedResponse != null) {
                return cachedResponse;
            }
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }

        String url = "https://v1.formula-1.api-sports.io/teams";
        TeamResponse response = fetchAndParse(url, TeamResponse.class);
        try {
            redisService.set(cacheKey, response);
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }
        return response;
    }

    // Driver
    public DriverResponse getDriver(String search) {
        String cacheKey = "driver-search-" + search;
        try {
            DriverResponse cachedResponse = redisService.get(cacheKey, DriverResponse.class);
            if (cachedResponse != null) {
                return cachedResponse;
            }
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }

        String url = String.format("https://v1.formula-1.api-sports.io/drivers?search=%s", search);
        DriverResponse response = fetchAndParse(url, DriverResponse.class);
        try {
            redisService.set(cacheKey, response);
        } catch (Exception e) {
            System.out.println("Redis error: " + e.getMessage());
        }
        return response;
    }

    // General
    private <T> T fetchAndParse(String url, Class<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-apisports-key", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return objectMapper.readValue(response.getBody(), responseType);
        } catch (Exception e) {
            e.printStackTrace();
            if (responseType == DriverResponse.class) {
                throw new IllegalArgumentException("Could not find this driver!");
            }
            throw new RuntimeException("Error processing API response", e);
        }
    }
}
