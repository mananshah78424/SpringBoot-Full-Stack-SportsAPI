package com.mysportswebsite.all_sports.soccer;


import com.mysportswebsite.all_sports.f1.Classes.TeamResponse;
import com.mysportswebsite.all_sports.soccer.Classes.StandingResponse;
import com.mysportswebsite.all_sports.soccer.Classes.TeamStatisticsResponse;
import com.mysportswebsite.all_sports.soccer.Classes.TeamsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Controller("MainSoccerController")
@CrossOrigin("localhost:3000")
@RestController
@RequestMapping("/api/soccer")
public class SoccerController {

    private final SoccerService soccerService;
    @Autowired
    public SoccerController(SoccerService soccerService) {
        this.soccerService = soccerService;
    }


    // Teams
    @GetMapping("/teams")
    public TeamsResponse getTeams(@RequestParam(value = "season", required = false) Integer season){
        season=(season!=null)? season : 2024;
        return soccerService.getTeams(season);
    }

    // Standings
    @GetMapping("/standings")
    public StandingResponse getStandings(@RequestParam(value = "season", required = false) Integer season){
        season=(season!=null)? season : 2024;
        return soccerService.getStandings(season);
    }

    // Team Stats
    @GetMapping("/teamstats")
    public TeamStatisticsResponse getStatistics(
            @RequestParam(value = "season", required = false) Integer season,
            @RequestParam(value = "league", required = false) Integer league,
            @RequestParam(value = "team", required = false) String team
    ){
        season=(season!=null)? season : 2024;
        league=(league!=null)? league:39;
        Map<String,Integer> teamMap= soccerService.fetchIdsAndTeamName(season,league);
        System.out.println(teamMap);
        Integer teamId=teamMap.get(team);
        if(teamId!=null){
            return soccerService.getTeamStatistics(teamId,season,league);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Team you entered could not be found!");
        }

    }
}
