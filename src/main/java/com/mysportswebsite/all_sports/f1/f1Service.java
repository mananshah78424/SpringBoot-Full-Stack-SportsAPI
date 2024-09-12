package com.mysportswebsite.all_sports.f1;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    @Autowired
    public f1Service(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    // Circuits
    public CircuitResponse getCircuits() {
        System.out.println("Getting circuits");
        String url = "https://v1.formula-1.api-sports.io/circuits";
        return fetchAndParse(url, CircuitResponse.class);
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

        return fetchAndParse(url, RaceResponse.class);
    }

    // Rankings
    public DriverRankingResponse getDriverRankings(int season) {
        String url = String.format("https://v1.formula-1.api-sports.io/rankings/drivers?season=%d", season);
        return fetchAndParse(url, DriverRankingResponse.class);
    }

    public TeamRankingResponse getTeamRankings(int season) {
        String url = String.format("https://v1.formula-1.api-sports.io/rankings/teams?season=%d", season);
        return fetchAndParse(url, TeamRankingResponse.class);
    }

    // Teams
    public TeamResponse getTeams() {
        String url = "https://v1.formula-1.api-sports.io/teams";
        return fetchAndParse(url, TeamResponse.class);
    }

    // Driver
    public DriverResponse getDriver(String search, Integer id) {
        String url;

        if (search != null) {
            url = String.format("https://v1.formula-1.api-sports.io/drivers?search=%s", search);
        } else if (id != null) {
            url = String.format("https://v1.formula-1.api-sports.io/drivers?id=%d", id);
        } else {
            throw new IllegalArgumentException("Either search or id must be provided");
        }

        return fetchAndParse(url, DriverResponse.class);
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
