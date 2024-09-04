package com.mysportswebsite.all_sports.f1.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DriverRankingResponse implements Serializable {
    private List<DriverRanking> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DriverRanking implements Serializable {
        private int position;
        private Driver driver;
        private Team team;
        private int points;
        private int wins;
        private Integer behind;
        private int season;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Driver implements Serializable {
            private int id;
            private String name;
            private String abbr;
            private int number;
            private String image;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Team implements Serializable{
            private int id;
            private String name;
            private String logo;
        }

        @Override
        public String toString() {
            return "DriverRanking{" +
                    "position=" + position +
                    ", driver=" + driver +
                    ", team=" + team +
                    ", points=" + points +
                    ", wins=" + wins +
                    ", behind=" + behind +
                    ", season=" + season +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "DriverRankingResponse{" +
                "response=" + response +
                '}';
    }
}
