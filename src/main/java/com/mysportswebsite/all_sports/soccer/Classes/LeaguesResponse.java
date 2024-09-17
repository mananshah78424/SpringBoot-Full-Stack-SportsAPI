package com.mysportswebsite.all_sports.soccer.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class LeaguesResponse {
    private List<LeagueResponse> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class LeagueResponse{
        private League league;
    }
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static  class League{
        private int id;
        private String name;
        private String type;
        private String logo;

    }
}
