package com.pensa.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateDiseaseDTO {

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 200, message = "Name must be less than 200 characters")
    private String name;

    private String description;
    private String symptoms;
    private String treatment;
    private String prevention;
    private String category;
    private String imageUrl; // Adicionado para permitir o upload de imagem

    // Construtor padrão (necessário para a desserialização)
    public CreateDiseaseDTO() {}

    // Construtor para criar o DTO
    public CreateDiseaseDTO(String name, String description, String symptoms, String treatment, String prevention, String category, String imageUrl) {
        this.name = name;
        this.description = description;
        this.symptoms = symptoms;
        this.treatment = treatment;
        this.prevention = prevention;
        this.category = category;
        this.imageUrl = imageUrl;
    }
    
    // Getters e Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getPrevention() {
        return prevention;
    }

    public void setPrevention(String prevention) {
        this.prevention = prevention;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}