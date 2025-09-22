package com.pensa.api.dto;

public class DoctorDTO {

    private Long id;
    private String name;
    private String specialty;
    private String email;
    private String phone;
    private String address;
    private String biography;
    private String imageUrl;

    // Construtor padrão (necessário para a desserialização)
    public DoctorDTO() {}

    // Construtor com todos os campos
    public DoctorDTO(Long id, String name, String specialty, String email, String phone, String address, String biography, String imageUrl) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.biography = biography;
        this.imageUrl = imageUrl;
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

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}