package com.mysportswebsite.all_sports.standings.Classes;

public class Parameters {
    private String league;
    private String season;

    public Parameters() {
    }

    public Parameters(String league, String season) {
        this.league = league;
        this.season = season;
    }

    public String getLeague() {
        return league;
    }

    public void setLeague(String league) {
        this.league = league;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    @Override
    public String toString() {
        return "Parameters{" +
                "league=" + league +
                ", season=" + season +
                '}';
    }
}
