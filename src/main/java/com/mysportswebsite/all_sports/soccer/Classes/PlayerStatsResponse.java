package com.mysportswebsite.all_sports.soccer.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlayerStatsResponse {
    private List<StatsResponse> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class StatsResponse {
        private Player player;
        private List<Statistics> statistics;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Player {
        private int id;
        private String name;
        private String firstname;
        private String lastname;
        private int age;
        private Birth birth;
        private String nationality;
        private String height;
        private String weight;
        private boolean injured;
        private String photo;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Birth {
        private String date;
        private String place;
        private String country;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Statistics {
        private Team team;
        private League league;
        private Games games;
        private Substitutes substitutes;
        private Shots shots;
        private Goals goals;
        private Passes passes;
        private Tackles tackles;
        private Duels duels;
        private Dribbles dribbles;
        private Fouls fouls;
        private Cards cards;
        private Penalty penalty;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Team {
        private int id;
        private String name;
        private String logo;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class League {
        private int id;
        private String name;
        private String country;
        private String logo;
        private String flag;
        private int season;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Games {
        private int appearences;
        private int lineups;
        private int minutes;
        private Integer number;  // Using Integer to handle potential null values
        private String position;
        private String rating;
        private boolean captain;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Substitutes {
        private int in;
        private int out;
        private int bench;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Shots {
        private int total;
        private int on;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Goals {
        private int total;
        private int conceded;
        private int assists;
        private Integer saves;  // Using Integer to handle potential null values
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Passes {
        private int total;
        private int key;
        private int accuracy;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Tackles {
        private int total;
        private Integer blocks;  // Using Integer to handle potential null values
        private Integer interceptions;  // Using Integer to handle potential null values
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Duels {
        private int total;
        private int won;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Dribbles {
        private int attempts;
        private int success;
        private Integer past;  // Using Integer to handle potential null values
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Fouls {
        private int drawn;
        private int committed;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Cards {
        private int yellow;
        private int yellowred;
        private int red;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Penalty {
        private Integer won;  // Using Integer to handle potential null values
        private Integer committed;  // Using Integer to handle potential null values
        private int scored;
        private int missed;
        private Integer saved;  // Using Integer to handle potential null values
    }
}
