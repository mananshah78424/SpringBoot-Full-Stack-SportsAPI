package com.mysportswebsite.all_sports.teamAndVenue;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysportswebsite.all_sports.teamAndVenue.Classes.MainTeamsAndVenueResponse;
import com.mysportswebsite.all_sports.teamAndVenue.Classes.Team;
import com.mysportswebsite.all_sports.teamAndVenue.Classes.TeamsAndVenuesResponseItem;
import com.mysportswebsite.all_sports.teamAndVenue.Classes.Venue;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service("teamService")
public class TeamsAndVenueService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public TeamsAndVenueService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public MainTeamsAndVenueResponse fetchTeamsAndVenue(){
//        HttpHeaders: This class is used to set the headers for the request. In this case, it sets the Authorization header with a Bearer token. Adjust the header key and value according to the API's requirements.
//
//        HttpEntity: This class holds the headers and the body of the request. In this case, we're only including headers, but you can also include a request body if needed.
//
//        restTemplate.exchange: This method is used to execute the request with the specified HTTP method and entity, and then return the response.
        String url="https://v3.football.api-sports.io/teams?league=39&season=2024";
        String apiKey="cb63e8e6c573b3b80dc3501a1b90740c";
        HttpHeaders headers=new HttpHeaders();
        headers.set("x-apisports-key", apiKey);
        HttpEntity<String> entity=new HttpEntity<>(headers);
        try{
            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET,entity,String.class);
            System.out.println(objectMapper.readValue(response.getBody(), MainTeamsAndVenueResponse.class));
            return objectMapper.readValue(response.getBody(), MainTeamsAndVenueResponse.class);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }


    }



    public List<TeamsAndVenuesResponseItem> processTeamsAndVenues(){
        MainTeamsAndVenueResponse apiResponse=fetchTeamsAndVenue();
        List<TeamsAndVenuesResponseItem> results=new ArrayList<>();
        if(apiResponse!=null) {
            List<TeamsAndVenuesResponseItem> responseItems = apiResponse.getResponse();
            for (TeamsAndVenuesResponseItem item : responseItems) {
                Team team = item.getTeam();
                Venue venue = item.getVenue();
                results.add(new TeamsAndVenuesResponseItem(team,venue));


            }
            return results;
        }else{
            System.out.println("Failed to process data");
            return null;
        }
    }
}
