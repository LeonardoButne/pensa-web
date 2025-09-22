package com.pensa.api.dto;

import java.time.LocalDateTime;

public class ProjectDTO {

    private Long id;
    private String title;
    private String description;
    private String clientName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
    private String imageUrl;
    private Boolean isFeatured;

    // Construtor padrão (necessário para a desserialização)
    public ProjectDTO() {}

    // Construtor com todos os campos
    public ProjectDTO(Long id, String title, String description, String clientName, LocalDateTime startDate, LocalDateTime endDate, String status, String imageUrl, Boolean isFeatured) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.clientName = clientName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.imageUrl = imageUrl;
        this.isFeatured = isFeatured;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
}