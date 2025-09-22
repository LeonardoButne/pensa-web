package com.pensa.api.dto;

public class ServiceDTO {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String type;

    // Construtor padrão (necessário para a desserialização)
    public ServiceDTO() {}

    // Construtor com todos os campos
    public ServiceDTO(Long id, String name, String description, String imageUrl, String type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.type = type;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}