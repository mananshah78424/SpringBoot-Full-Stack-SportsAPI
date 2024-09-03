package com.mysportswebsite.all_sports.soccer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysportswebsite.all_sports.f1.Classes.DriverResponse;
import com.mysportswebsite.all_sports.f1.Classes.TeamResponse;
import com.mysportswebsite.all_sports.soccer.Classes.StandingResponse;
import com.mysportswebsite.all_sports.soccer.Classes.TeamStatisticsResponse;
import com.mysportswebsite.all_sports.soccer.Classes.TeamsResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SoccerService {

    @Value("${api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public SoccerService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    // Standings

    public StandingResponse getStandings(Integer season){
        String url=String.format("https://v3.football.api-sports.io/standings?league=39&season=%d",season);
        return fetchAndParse(url,StandingResponse.class);
    }


    // Teams
    public TeamsResponse getTeams(Integer season){
        String url=String.format("https://v3.football.api-sports.io/teams?league=39&season=%d",season);
        return fetchAndParse(url,TeamsResponse.class);
    }

    // Team stats
    public TeamStatisticsResponse getTeamStatistics(Integer teamId, Integer season, Integer leagueId) {
        String url = String.format("https://v3.football.api-sports.io/teams/statistics?team=%d&season=%d&league=%d",
                teamId, season, leagueId);
        return fetchAndParse(url, TeamStatisticsResponse.class);
    }

    // General

    private <T> T fetchAndParse(String url, Class<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-apisports-key", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            String responseBody=response.getBody();
            System.out.println(responseBody);
            if(responseBody.startsWith("[")){
                return objectMapper.readValue(responseBody,
                        objectMapper.getTypeFactory().constructCollectionType(List.class, responseType));
            }else{
                return objectMapper.readValue(response.getBody(), responseType);

            }
        } catch (Exception e) {
            e.printStackTrace();

            throw new RuntimeException("Error processing API response", e);
        }
    }


    public Map<String,Integer> fetchIdsAndTeamName(Integer season, Integer leagueId) {
        TeamsResponse teamsResponse=getTeams(season);
        List<TeamsResponse.Response> teams=teamsResponse.getResponse();
        List<TeamStatisticsResponse> allTeamStatistics = new ArrayList<>();
        Map<String,Integer> teamMap=new HashMap<>();
        if(teams!=null && !teams.isEmpty() ) {
            for(TeamsResponse.Response teamData:teams){
                Integer teamId=teamData.getTeam().getId();
                String teamName=teamData.getTeam().getName();
                teamMap.put(teamName,teamId);
//                System.out.println(teamId);
//                TeamStatisticsResponse teamStatisticsResponse=getTeamStatistics(teamId,season,leagueId);
//                System.out.println(teamStatisticsResponse);
//                allTeamStatistics.add(teamStatisticsResponse);

            }
        }
        return teamMap;

    }
}
