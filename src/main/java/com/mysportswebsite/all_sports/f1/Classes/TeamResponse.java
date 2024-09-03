package com.mysportswebsite.all_sports.f1.Classes;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TeamResponse {
    private List<Team> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Team{
        private int id;
        private String name;
        private String logo;
        private String base;

        @JsonProperty("world_championships")
        private int championships_won;
        private String president;
        private String director;
        private String engine;
        @JsonProperty("technical_manager")
        private String manager;

    }
}
