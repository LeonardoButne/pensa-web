package com.pensa.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResetPasswordDTO {
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 6, max = 120)
    private String newPassword;
    
    // Constructors, getters, setters...
    public ResetPasswordDTO() {}
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}