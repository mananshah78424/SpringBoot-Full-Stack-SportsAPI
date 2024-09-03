package com.mysportswebsite.all_sports.f1.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DriverResponse {
    private List<Driver> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Driver{
        private int id;
        private String name;
        private String image;
        private String nationality;
        @JsonProperty("birthdate")
        private String dob;
        @JsonProperty("world_championships")
        private int championswon;
        private int podiums;
        private double career_points;

    }

}
