package com.mysportswebsite.all_sports.soccer.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TeamStatisticsResponse {
    private Response response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Response {
        private Team team;
        private String form;
        private Fixtures fixtures;

        @Data
        public static class Team {
            private int id;
            private String name;
            private String logo;
        }
        @Data
        public static class Fixtures {
            private Played played;
            private Wins wins;
            private Draws draws;
            private Loses loses;
        }

        @Data
        public static class Played {
            private int home;
            private int away;
            private int total;
        }

        @Data
        public static class Wins {
            private int home;
            private int away;
            private int total;
        }

        @Data
        public static class Draws {
            private int home;
            private int away;
            private int total;
        }

        @Data
        public static class Loses {
            private int home;
            private int away;
            private int total;
        }



    }
}
