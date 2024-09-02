package com.mysportswebsite.all_sports.playerNames.Classes;

public class Parameters {
    private int league;
    private int seasons;

    public Parameters() {
    }

    public int getLeague() {
        return league;
    }

    public void setLeague(int league) {
        this.league = league;
    }

    public int getSeasons() {
        return seasons;
    }

    public void setSeasons(int seasons) {
        this.seasons = seasons;
    }

    @Override
    public String toString() {
        return "Parameters{" +
                "league=" + league +
                ", seasons=" + seasons +
                '}';
    }
}
