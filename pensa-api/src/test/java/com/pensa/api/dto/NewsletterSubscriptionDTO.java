package com.pensa.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class NewsletterSubscriptionDTO {

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email format")
    private String email;

    @Size(max = 100, message = "Name must be less than 100 characters")
    private String name;

    // Construtor padrão (necessário para a desserialização)
    public NewsletterSubscriptionDTO() {}

    // Construtor com todos os campos
    public NewsletterSubscriptionDTO(String email, String name) {
        this.email = email;
        this.name = name;
    }

    // Getters e Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}