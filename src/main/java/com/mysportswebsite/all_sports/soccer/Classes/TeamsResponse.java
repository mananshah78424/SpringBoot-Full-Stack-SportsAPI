package com.mysportswebsite.all_sports.soccer.Classes;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TeamsResponse {
    private List<Response> response;


    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Response {
        private Team team;
        private Venue venue;



        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Team {
            private int id;
            private String name;
            private String code;
            private String country;
            private int founded;
            private boolean national;
            private String logo;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Venue {
            private int id;
            private String name;
            private String address;
            private String city;
            private int capacity;
            private String surface;
            private String image;
        }

    }
}
