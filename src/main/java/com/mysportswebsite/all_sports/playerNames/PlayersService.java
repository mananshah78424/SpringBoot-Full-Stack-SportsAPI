package com.mysportswebsite.all_sports.playerNames;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysportswebsite.all_sports.playerNames.Classes.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service("playerService")
public class PlayersService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public PlayersService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public MainPlayersResponse fetchPlayerNamesAndStatistics(int league, int season, int page){
        String url=String.format("https://v3.football.api-sports.io/players?league=%d&&season=%d&page=%d", league,season,page);
        String apiKey="cb63e8e6c573b3b80dc3501a1b90740c";
        HttpHeaders headers=new HttpHeaders();
        headers.set("x-apisports-key", apiKey);
        HttpEntity<String> entity=new HttpEntity<>(headers);
        try{
            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET,entity,String.class);
            // The readValue method is used to convert JSON data into a Java object.
            return objectMapper.readValue(response.getBody(), MainPlayersResponse.class);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<PlayerAndStatisticsResponseItem> getAllPlayers(int league, int season){
        return fetchAllPlayers(league,season,1,new ArrayList<>());
    }

    public List<PlayerAndStatisticsResponseItem> fetchAllPlayers(int league, int season, int page, List<PlayerAndStatisticsResponseItem> allPlayers ){
        MainPlayersResponse apiResponse=fetchPlayerNamesAndStatistics(league,season,page);
        List<PlayerAndStatisticsResponseItem> results=new ArrayList<>();
        if (apiResponse!=null){
            List<PlayerAndStatisticsResponseItem> responseItems=apiResponse.getResponse();
            if(responseItems!=null){
                allPlayers.addAll(responseItems);
                Paging paging=apiResponse.getPaging();
                System.out.println(paging.getTotal());
                if(paging!=null && paging.getCurrent()<paging.getTotal()){
                    if(paging.getCurrent()%2==1){
                        try{
                            Thread.sleep(7000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                            throw new RuntimeException(e);
                        }
                    }
                    System.out.println("Done with page: "+ paging.getCurrent());
                    return fetchAllPlayers(league,season,paging.getCurrent()+1,allPlayers);
                }
            }


        }
        return allPlayers;
    }

    public List<PlayerAndStatisticsResponseItem> processPlayerStatistics(List<PlayerAndStatisticsResponseItem> allPlayers){
        List<PlayerAndStatisticsResponseItem> results=new ArrayList<>();
        for (PlayerAndStatisticsResponseItem item: allPlayers){
                Player player=item.getPlayer();
                List<PlayerStatistics> playerStatisticsList = new ArrayList<>();
                for (PlayerStatistics stats : item.getStatistics()) {
                    // Extract relevant statistics
                    PlayerStatistics playerStatistics = new PlayerStatistics();
                    playerStatistics.setTeam(stats.getTeam());
                    playerStatistics.setLeague(stats.getLeague());
                    playerStatisticsList.add(playerStatistics);
                }
                results.add(new PlayerAndStatisticsResponseItem(player,playerStatisticsList));

        }
        return results;

    }
}
