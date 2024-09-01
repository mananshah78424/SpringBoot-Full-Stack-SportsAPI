package com.mysportswebsite.all_sports.PlayerNames.Classes;


import java.util.List;

public class ApiResponse {
    private String get;
    private Parameters parameters;
    private Object errors;
    private int results;
    private com.mysportswebsite.all_sports.PlayerNames.Classes.Paging paging;
    private List<PlayerAndStatisticsResponseItem> response;

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

    public List<PlayerAndStatisticsResponseItem> getResponse() {
        return response;
    }

    public void setResponse(List<PlayerAndStatisticsResponseItem> response) {
        this.response = response;
    }
}
