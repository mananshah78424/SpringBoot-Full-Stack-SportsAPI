package com.mysportswebsite.all_sports.standings;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysportswebsite.all_sports.standings.Classes.League;
import com.mysportswebsite.all_sports.standings.Classes.MainStandingsResponse;
import com.mysportswebsite.all_sports.standings.Classes.TeamStanding;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service("standingsService")
public class StandingsService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public StandingsService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public MainStandingsResponse fetchStandings(int league, int season) {
        String url = String.format("https://v3.football.api-sports.io/standings?league=%d&season=%d", league, season);
        String apiKey = "cb63e8e6c573b3b80dc3501a1b90740c";
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-apisports-key", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            System.out.println("Raw Response Body: " + response.getBody());
            MainStandingsResponse mainStandingsResponse=objectMapper.readValue(response.getBody(),MainStandingsResponse.class);
            System.out.println(mainStandingsResponse);
            return mainStandingsResponse;
            ///return objectMapper.readValue(response.getBody(),MainStandingsResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error processing API response", e);
        }
    }





}
