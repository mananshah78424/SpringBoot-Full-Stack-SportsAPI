package com.mysportswebsite.all_sports.PlayerNames;

import com.mysportswebsite.all_sports.PlayerNames.Classes.PlayerAndStatisticsResponseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/v1")
public class ApiController {

    private final ApiService apiService;

    @Autowired
    public ApiController(ApiService apiService) {
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
