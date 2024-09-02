package com.mysportswebsite.all_sports.standings.Classes;

import java.util.List;

public class MainStandingsResponse {
    private String get;
    private Parameters parameters;
    private Object errors;
    private int results;
    private Paging paging;
    private List<LeagueResponse> response;

    public MainStandingsResponse() {
    }

    public MainStandingsResponse(String get, Parameters parameters, Object errors, int results, Paging paging, List<LeagueResponse> response) {
        this.get = get;
        this.parameters = parameters;
        this.errors = errors;
        this.results = results;
        this.paging = paging;
        this.response = response;
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

    public Object getErrors() {
        return errors;
    }

    public void setErrors(Object errors) {
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

    public List<LeagueResponse> getResponse() {
        return response;
    }

    public void setResponse(List<LeagueResponse> response) {
        this.response = response;
    }

    @Override
    public String toString() {
        return "MainStandingsResponse{" +
                "get='" + get + '\'' +
                ", parameters=" + parameters +
                ", errors=" + errors +
                ", results=" + results +
                ", paging=" + paging +
                ", response=" + response +
                '}';
    }
}