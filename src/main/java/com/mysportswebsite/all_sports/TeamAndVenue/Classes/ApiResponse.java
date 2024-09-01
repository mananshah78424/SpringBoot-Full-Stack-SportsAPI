package com.mysportswebsite.all_sports.TeamAndVenue.Classes;


import java.util.List;

public class ApiResponse {
    private String get;
    private Parameters parameters;
    private List<Object> errors;
    private int results;
    private Paging paging;
    private List<TeamsAndVenuesResponseItem> response;

    public ApiResponse() {
    }

    public String getGet() {
        return get;
    }

    public void setGet(String get) {
        this.get = get;
    }

    public Parameters getParameters() {
        return parameters;
    }

    public void setParameters(Parameters parameters) {
        this.parameters = parameters;
    }

    public List<Object> getErrors() {
        return errors;
    }

    public void setErrors(List<Object> errors) {
        this.errors = errors;
    }

    public int getResults() {
        return results;
    }

    public void setResults(int results) {
        this.results = results;
    }

    public Paging getPaging() {
        return paging;
    }

    public void setPaging(Paging paging) {
        this.paging = paging;
    }

    public List<TeamsAndVenuesResponseItem> getResponse() {
        return response;
    }

    public void setResponse(List<TeamsAndVenuesResponseItem> response) {
        this.response = response;
    }
}

