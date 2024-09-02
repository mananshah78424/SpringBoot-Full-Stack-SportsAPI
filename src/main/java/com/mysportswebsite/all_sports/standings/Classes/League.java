package com.mysportswebsite.all_sports.standings.Classes;

import java.util.List;

public class League {
    private int id;
    private String name;
    private String country;
    private String logo;
    private String flag;
    private int season;
    private List<List<TeamStanding>> standings;


    public League() {
    }

    public League(int id, String name, String country, String logo, String flag, int season ,  List<List<TeamStanding>>standings) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.logo = logo;
        this.flag = flag;
        this.season = season;
        this.standings=standings;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        System.out.println("Id being set here to "+ id);
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public int getSeason() {
        return season;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    public  List<List<TeamStanding>> getStandings() {
        return standings;
    }

    public void setStandings( List<List<TeamStanding>> standings) {
        this.standings = standings;
    }

    @Override
    public String toString() {
        return "League{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", country='" + country + '\'' +
                ", logo='" + logo + '\'' +
                ", flag='" + flag + '\'' +
                ", season=" + season +
                ", standings=" + standings +
                '}';
    }
}
