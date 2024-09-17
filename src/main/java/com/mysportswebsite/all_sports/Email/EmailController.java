package com.mysportswebsite.all_sports.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/email")
    @ResponseBody // Add this annotation
    public String submitEmail(
            @RequestParam(value="email", required = true) String email,
            @RequestParam(value = "sport", required = true) String sport
    ) {
        System.out.println("Got email and sport as " + email + " " + sport);
        emailService.saveDetails(email, sport);
        return "Email and sport saved successfully!";
    }
}
