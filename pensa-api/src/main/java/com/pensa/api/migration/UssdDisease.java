package com.pensa.api.migration;

public class UssdDisease {
    
    private Long id;
    private String name;
    private Long diseaseSubmenuId; // Chave para o menu principal

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

    public Long getDiseaseSubmenuId() {
        return diseaseSubmenuId;
    }

    public void setDiseaseSubmenuId(Long diseaseSubmenuId) {
        this.diseaseSubmenuId = diseaseSubmenuId;
    }
}