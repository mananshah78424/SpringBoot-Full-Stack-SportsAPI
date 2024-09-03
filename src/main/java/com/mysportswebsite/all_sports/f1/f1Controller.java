package com.mysportswebsite.all_sports.f1;

import com.mysportswebsite.all_sports.f1.Classes.CircuitResponse;
import com.mysportswebsite.all_sports.f1.Classes.DriverResponse;
import com.mysportswebsite.all_sports.f1.Classes.RaceResponse;
import com.mysportswebsite.all_sports.f1.Classes.TeamResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("localhost:3000")
@RestController
@RequestMapping("/api/f1")
public class f1Controller {
    private final f1Service f1Service;

    @Autowired
    public f1Controller(com.mysportswebsite.all_sports.f1.f1Service f1Service) {
        this.f1Service = f1Service;
    }


    // Rankings

    @GetMapping("/rankings/{type}")
    public Object getRankings(
            @PathVariable String type,
            @RequestParam(required = false) Integer season
    ){
        season=(season!=null)?season:2024;
        if ("drivers".equalsIgnoreCase(type)) {
            return f1Service.getDriverRankings(season);
        } else if ("teams".equalsIgnoreCase(type)) {
            return f1Service.getTeamRankings(season);
        } else {
            return "Invalid type. Please specify 'drivers' or 'teams'.";
        }
    }


    // Races

    @GetMapping("/races")
    public RaceResponse getRaces(
            @RequestParam(value = "season", required = false) Integer season,
            @RequestParam(value = "timezone", required = false) String timezone,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "next", required = false) Integer next
    ){
        season=(season!=null)?season:2024;
        return f1Service.getRaces(season,next,timezone,type);
    }


    //Circuits
    @GetMapping("/circuits")
    public CircuitResponse getCircuits(){
        return f1Service.getCircuits();
    }


    // Teams

    @GetMapping("/teams")
    public TeamResponse getTeams(){
        return f1Service.getTeams();
    }

    //Driver
    @GetMapping("/driver")
    public DriverResponse getDrivers(@RequestParam(value="search", required = false) String search){
        return f1Service.getDriver(search);
    }
}
