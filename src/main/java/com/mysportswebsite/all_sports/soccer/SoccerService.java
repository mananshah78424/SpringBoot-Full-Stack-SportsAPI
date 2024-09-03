package com.mysportswebsite.all_sports.soccer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysportswebsite.all_sports.f1.Classes.DriverResponse;
import com.mysportswebsite.all_sports.f1.Classes.TeamResponse;
import com.mysportswebsite.all_sports.soccer.Classes.FixtureResponse;
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


    public FixtureResponse getFixtures(Integer season, Integer league, String live, String date, Integer teamID, String round, String timezone) {
        StringBuilder urlBuilder = new StringBuilder("https://v3.football.api-sports.io/fixtures?");

        // Append parameters if they are provided
        if (season != null) {
            urlBuilder.append("season=").append(season).append("&");
        }
        if (league != null) {
            urlBuilder.append("league=").append(league).append("&");
        }
        if (live != null) {
            urlBuilder.append("live=").append(live).append("&");
        }
        if (date != null) {
            urlBuilder.append("date=").append(date).append("&");
        }
        if (teamID != null) {
            urlBuilder.append("team=").append(teamID).append("&");
        }
        if (round != null) {
            urlBuilder.append("round=").append(round).append("&");
        }
        if (timezone != null) {
            urlBuilder.append("timezone=").append(timezone).append("&");
        }

        // Remove the last '&' if any
        String url = urlBuilder.toString();
        System.out.println(url);
        if (url.endsWith("&")) {
            url = url.substring(0, url.length() - 1);
        }

        // Call the fetchAndParse method to get the fixture response
        return fetchAndParse(url, FixtureResponse.class);
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

            throw new RuntimeException("Error processing API response", e);
        }
    }



    // Fetch ids and team name for stats
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
            }
        }
        return teamMap;

    }
}
