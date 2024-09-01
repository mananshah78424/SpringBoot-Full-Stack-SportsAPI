package com.mysportswebsite.all_sports.PlayerNames;


import com.mysportswebsite.all_sports.PlayerNames.Classes.PlayerAndStatisticsResponseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller("playerController")
@RestController
@RequestMapping(path="api/v1")
public class ApiController {
    private final ApiService apiService;

    @Autowired
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping(path="/players")
    public List<PlayerAndStatisticsResponseItem> processPlayers(){
        return apiService.processPlayerAndStatistics();
    }
}
