package com.mysportswebsite.all_sports.standings.Classes;

public class LeagueResponse {
    private League league;

    public LeagueResponse() {
    }

    public LeagueResponse(League league) {
        this.league = league;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    @Override
    public String toString() {
        return "LeagueResponse{" +
                "league=" + league +
                '}';
    }
}
