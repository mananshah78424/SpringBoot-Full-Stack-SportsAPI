package com.mysportswebsite.all_sports.f1.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RaceResponse {
    private List<Race> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Race{
        private int id;
        private Competition competition;

        @JsonProperty("circuit")
        private CircuitDetails circuitDetails;

        private int season;

        @JsonProperty("laps")
        private Laps laps;
        private String data;
        private String type;
        private String distance;
        private String status;
        private String date;
        private String timezone;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Competition{
            private String name;
            private Location location;

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public static class Location{
                private String country;
                private String city;
            }
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class CircuitDetails{
            private String name;
            private String image;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        private static class Laps{
            private Integer total;
        }


    }

}
