package com.mysportswebsite.all_sports.standings;

import com.mysportswebsite.all_sports.standings.Classes.MainStandingsResponse;
import com.mysportswebsite.all_sports.standings.Classes.TeamStanding;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller("standingsController")
@RestController
@RequestMapping(path="/api/v1")
public class StandingsController {
    private final StandingsService apiService;
    public StandingsController(StandingsService apiService){
        this.apiService=apiService;
    }

    @GetMapping("/standings")
    public MainStandingsResponse getStanding(){
        return apiService.fetchStandings(39,2024);
    }

}
