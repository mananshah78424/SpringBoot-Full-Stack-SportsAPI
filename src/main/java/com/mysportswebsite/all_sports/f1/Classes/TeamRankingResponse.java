package com.mysportswebsite.all_sports.f1.Classes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TeamRankingResponse implements Serializable {

    private List<TeamRanking> response;


    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TeamRanking implements Serializable{
        private int position;
        private Team team;
        private int points;
        private int season;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Team implements Serializable{
            private int id;
            private String name;
            private String logo;
        }

        @Override
        public String toString() {
            return "TeamRanking{" +
                    "position=" + position +
                    ", team=" + team +
                    ", points=" + points +
                    ", season=" + season +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "TeamRankingResponse{" +
                "response=" + response +
                '}';
    }
}
