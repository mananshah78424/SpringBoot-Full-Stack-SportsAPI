package com.mysportswebsite.all_sports.soccer.playerNames.Classes;

public class Player {
    private String name;
    private String firstname;
    private String lastname;
    private int age;
    private String nationality;
    private String photo;
    private boolean injured;
    private String height;
    private String weight;

    public Player() {
    }

    public Player(String name, String firstname, String lastname, int age, String nationality, String photo, boolean injured, String height, String weight) {
        this.name = name;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.nationality = nationality;
        this.photo = photo;
        this.injured = injured;
        this.height = height;
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public boolean isInjured() {
        return injured;
    }

    public void setInjured(boolean injured) {
        this.injured = injured;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }
}
