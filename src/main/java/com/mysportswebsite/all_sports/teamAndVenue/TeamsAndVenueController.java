package com.mysportswebsite.all_sports.teamAndVenue;

import com.mysportswebsite.all_sports.teamAndVenue.Classes.TeamsAndVenuesResponseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller("teamController")
@RestController
@RequestMapping(path="/api/v1")
public class TeamsAndVenueController {
    private final TeamsAndVenueService apiService;

    @Autowired
    public TeamsAndVenueController(TeamsAndVenueService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/teams")
    public List<TeamsAndVenuesResponseItem> processTeamAndVenues(){
        return apiService.processTeamsAndVenues();

    }
}
