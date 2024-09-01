package com.mysportswebsite.all_sports.TeamAndVenue;

import com.mysportswebsite.all_sports.TeamAndVenue.Classes.TeamsAndVenuesResponseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/api/v1/teams")
public class ApiController {
    private final ApiService apiService;

    @Autowired
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping
    public List<TeamsAndVenuesResponseItem> processTeamAndVenues(){
        return apiService.processTeamsAndVenues();

    }
}
