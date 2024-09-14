package com.mysportswebsite.all_sports.soccer.Classes;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class StandingResponse {
    private List<LeagueResponse> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class LeagueResponse{
        private League league;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class League {
            private int id;
            private String name;
            private String country;
            private String logo;
            private String flag;
            private int season;
            private List<List<TeamStanding>> standings;

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public static class TeamStanding {
                private int rank;
                private Team team;
                private int points;
                private int goalsDiff;
                private String group;
                private String form;
                private String status;
                private String description;
                @JsonProperty("all")
                private Played all;

                @Data
                @JsonIgnoreProperties(ignoreUnknown = true)
                public static class Team {
                    private int id;
                    private String name;
                    private String logo;

                }

                @Data
                @JsonIgnoreProperties(ignoreUnknown = true)
                public  static class Played{
                    @JsonProperty("played")
                    private int games_played;
                    private int win;
                    private int draw;
                    private int lose;
                    private Goals goals;

                    @Data
                    @JsonIgnoreProperties(ignoreUnknown = true)
                    public  static class Goals{
                        @JsonProperty("for")
                        private int scored;
                        @JsonProperty("against")
                        private int allowed;

                    }

                }
            }


        }
    }
}


