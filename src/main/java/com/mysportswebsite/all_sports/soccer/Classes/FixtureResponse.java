package com.mysportswebsite.all_sports.soccer.Classes;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FixtureResponse {
    private List<Response> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Response{
        private Fixture fixture;
        private Teams teams;
        private Score score;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Fixture{
            private int id;
            private String referee;
            private String timezone;
            private String date;
            private Timestamp timestamp;
            private Venue venue;
            private Status status;

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public static class Venue{
                private int id;
                private String name;
                private String city;
            }

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public static  class Status{
                @JsonProperty("long")
                private String status_long;
                @JsonProperty("short")
                private String status_short;
                private String elapsed;
            }

        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Teams{
            private Home home;
            private Away away;

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public static class Home{
                private int id;
                private String name;
                private String logo;
                private boolean winner;
            }

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public static class Away{
                private int id;
                private String name;
                private String logo;
                private boolean winner;
            }
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Score{
            private Fulltime fulltime;

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public static class Fulltime{
                private int home;
                private int away;
            }
        }
    }
}
