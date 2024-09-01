package com.mysportswebsite.all_sports.PlayerNames.Classes;

public class PlayerStatistics {
    private Team team;
    private League league;

    public PlayerStatistics() {
    }

    public PlayerStatistics(Team team, League league) {
        this.team = team;
        this.league = league;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public static class Team{
        private int id;
        private String name;
        private String logo;


        public Team() {
        }

        public Team(int id, String name, String logo) {
            this.id = id;
            this.name = name;
            this.logo = logo;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getLogo() {
            return logo;
        }

        public void setLogo(String logo) {
            this.logo = logo;
        }
    }

    public  static class League{
        private int id;
        private String name;
        private String country;
        private String logo;
        private String flag;
        private int season;

        public League() {
        }

        public League(int id, String name, String country, String logo, String flag, int season) {
            this.id = id;
            this.name = name;
            this.country = country;
            this.logo = logo;
            this.flag = flag;
            this.season = season;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
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
    }
}


