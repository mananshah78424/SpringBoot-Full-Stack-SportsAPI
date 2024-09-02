package com.mysportswebsite.all_sports.playerNames.Classes;

import java.util.List;

public class PlayerAndStatisticsResponseItem {
    private Player player;
    private List<PlayerStatistics> statistics;

    // Constructors
    public PlayerAndStatisticsResponseItem() {}

    public PlayerAndStatisticsResponseItem(Player player, List<PlayerStatistics> statistics) {
        this.player = player;
        this.statistics = statistics;
    }

    // Getters and setters
    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public List<PlayerStatistics> getStatistics() {
        return statistics;
    }

    public void setStatistics(List<PlayerStatistics> statistics) {
        this.statistics = statistics;
    }
}
