package com.mysportswebsite.all_sports.f1.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RaceResponse implements Serializable {
    private List<Race> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Race implements Serializable{
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
        public static class Competition implements  Serializable{
            private Integer id;
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
        public static class CircuitDetails implements Serializable{
            private String name;
            private String image;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        private static class Laps implements Serializable{
            private Integer total;
        }


    }

}
