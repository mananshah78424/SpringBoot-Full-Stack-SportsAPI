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
        private Integer first_grand_prix;
        private int firstGrandPrize;
        private int laps;
        private String length;
        private String race_distance;
        private Integer capacity;
        private LapRecord lap_record;

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

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class LapRecord implements  Serializable{
            private String time;
            private String driver;
            private String year;

        }

    }
}
