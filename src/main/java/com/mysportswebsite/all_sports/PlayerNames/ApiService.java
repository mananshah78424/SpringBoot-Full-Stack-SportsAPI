package com.mysportswebsite.all_sports.PlayerNames;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysportswebsite.all_sports.PlayerNames.Classes.ApiResponse;
import com.mysportswebsite.all_sports.PlayerNames.Classes.Player;
import com.mysportswebsite.all_sports.PlayerNames.Classes.PlayerAndStatisticsResponseItem;
import com.mysportswebsite.all_sports.PlayerNames.Classes.PlayerStatistics;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service("playerService")
public class ApiService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public ApiService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public ApiResponse fetchPlayerNamesAndStatistics(){
        String url="https://v3.football.api-sports.io/players?league=39&season=2024";
        String apiKey="cb63e8e6c573b3b80dc3501a1b90740c";
        HttpHeaders headers=new HttpHeaders();
        headers.set("x-apisports-key", apiKey);
        HttpEntity<String> entity=new HttpEntity<>(headers);
        try{
            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET,entity,String.class);
            // The readValue method is used to convert JSON data into a Java object.
            return objectMapper.readValue(response.getBody(),ApiResponse.class);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<PlayerAndStatisticsResponseItem> processPlayerAndStatistics(){
        ApiResponse apiResponse=fetchPlayerNamesAndStatistics();
        List<PlayerAndStatisticsResponseItem> results=new ArrayList<>();
        if (apiResponse!=null){
            List<PlayerAndStatisticsResponseItem> responseItems=apiResponse.getResponse();
            for(PlayerAndStatisticsResponseItem item: responseItems){
                Player player=item.getPlayer();
                List<PlayerStatistics> playerStatisticsList = new ArrayList<>();
                for (PlayerStatistics stats : item.getStatistics()) {
                    // Extract relevant statistics
                    PlayerStatistics playerStatistics = new PlayerStatistics();
                    playerStatistics.setTeam(stats.getTeam());
                    playerStatistics.setLeague(stats.getLeague());
                    playerStatisticsList.add(playerStatistics);
                }
                System.out.println(playerStatisticsList);
                results.add(new PlayerAndStatisticsResponseItem(player,playerStatisticsList));
            }
            return results;

        }

        else{
            return null;
        }
    }
}
