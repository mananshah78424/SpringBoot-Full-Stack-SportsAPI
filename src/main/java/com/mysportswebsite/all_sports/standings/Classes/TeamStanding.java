package com.mysportswebsite.all_sports.standings.Classes;

public class TeamStanding {
    private int rank;
    private Team team;
    private int points;
    private int goalsDiff;
    private String group;
    private String form;
    private String status;
    private String description;

    public TeamStanding() {
    }

    public TeamStanding(int rank, Team team, int points, int goalsDiff, String group, String form, String status, String description) {
        this.rank = rank;
        this.team = team;
        this.points = points;
        this.goalsDiff = goalsDiff;
        this.group = group;
        this.form = form;
        this.status = status;
        this.description = description;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getGoalsDiff() {
        return goalsDiff;
    }

    public void setGoalsDiff(int goalsDiff) {
        this.goalsDiff = goalsDiff;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getForm() {
        return form;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "TeamStanding{" +
                "rank=" + rank +
                ", team=" + team +
                ", points=" + points +
                ", goalsDiff=" + goalsDiff +
                ", group='" + group + '\'' +
                ", form='" + form + '\'' +
                ", status='" + status + '\'' +
                ", description='" + description + '\'' +
                '}';
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

        @Override
        public String toString() {
            return "Team{" +
                    "id=" + id +
                    ", name='" + name + '\'' +
                    ", logo='" + logo + '\'' +
                    '}';
        }
    }
}
