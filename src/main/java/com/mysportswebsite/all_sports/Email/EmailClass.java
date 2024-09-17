package com.mysportswebsite.all_sports.Email;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EmailClass {
    private String email;
    private String sport;

}
