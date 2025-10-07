package com.pensa.api.migration;

public class UssdDiseaseConcern {
    
    private Long id;
    private String name; // Ex: 'Symptoms', 'Treatment', 'Prevention'

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}