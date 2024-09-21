package com.mysportswebsite.all_sports;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingChecker {
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/healthcheck")
    public String healthCheck() {
        return "Service is up and running!";
    }
}
