package com.mysportswebsite.all_sports.standings.Classes;

public class Paging {
    private int current;
    private int total;

    public Paging() {
    }

    public int getCurrent() {
        return current;
    }

    public void setCurrent(int current) {
        this.current = current;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Paging{" +
                "current=" + current +
                ", total=" + total +
                '}';
    }
}
