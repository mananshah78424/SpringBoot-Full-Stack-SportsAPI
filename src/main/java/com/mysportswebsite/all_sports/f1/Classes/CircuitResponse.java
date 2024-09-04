package com.mysportswebsite.all_sports.f1.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CircuitResponse implements Serializable {
    private List<Circuit> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Circuit implements  Serializable{
        private int id;
        private String name;
        private String image;
        private Competition competition;
        private int firstGrandPrize;
        private int laps;
        private String length;
        private String raceDistance;
        private Integer capacity;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Competition implements  Serializable{
            private String name;
            private Location location;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Location implements  Serializable{
            private String country;
            private String city;
        }

    }
}
