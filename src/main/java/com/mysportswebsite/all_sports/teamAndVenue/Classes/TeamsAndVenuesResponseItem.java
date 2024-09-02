package com.mysportswebsite.all_sports.teamAndVenue.Classes;

public class TeamsAndVenuesResponseItem {
    private Team team;
    private Venue venue;

    public TeamsAndVenuesResponseItem(Team team, Venue venue) {
        this.team=team;
        this.venue=venue;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    @Override
    public String toString() {
        return "TeamsAndVenuesResponseItem{" +
                "team=" + team +
                ", venue=" + venue +
                '}';
    }
}
