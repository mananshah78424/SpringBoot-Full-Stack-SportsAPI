package com.mysportswebsite.all_sports.soccer.playerNames;

import com.mysportswebsite.all_sports.soccer.playerNames.Classes.PlayerAndStatisticsResponseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/v1")
public class PlayersController {

    private final PlayersService apiService;

    @Autowired
    public PlayersController(PlayersService apiService) {
        this.apiService = apiService;
    }

    @GetMapping(path="/players")
    public List<PlayerAndStatisticsResponseItem> processPlayers() {
        // Fetch all players and their statistics
        List<PlayerAndStatisticsResponseItem> allPlayers = apiService.getAllPlayers(39, 2024);

        // Process player statistics if needed (this is optional based on your use case)
        List<PlayerAndStatisticsResponseItem> processedPlayers = apiService.processPlayerStatistics(allPlayers);

        // Return the processed list of players and their statistics
        return processedPlayers;
    }
}
