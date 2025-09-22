package com.pensa.api.dto;

import java.time.LocalDateTime;

public class DiseaseDTO {

    private Long id;
    private String name;
    private String description;
    private String symptoms;
    private String treatment;
    private String prevention;
    private String imageUrl;
    private Boolean isFeatured;
    private String category;
    private LocalDateTime createdAt;
    
    // Construtor padrão (necessário para a desserialização)
    public DiseaseDTO() {}

    // Construtor para criar o DTO a partir da entidade
    public DiseaseDTO(Long id, String name, String description, String symptoms, String treatment, String prevention, String imageUrl, Boolean isFeatured, String category, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.symptoms = symptoms;
        this.treatment = treatment;
        this.prevention = prevention;
        this.imageUrl = imageUrl;
        this.isFeatured = isFeatured;
        this.category = category;
        this.createdAt = createdAt;
    }

    // Getters e Setters
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}