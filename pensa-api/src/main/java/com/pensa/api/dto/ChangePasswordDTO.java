package com.pensa.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChangePasswordDTO {
    @NotBlank
    @Size(min = 6, max = 120)
    private String oldPassword;
    
    @NotBlank
    @Size(min = 6, max = 120)
    private String newPassword;
    
    // Constructors, getters, setters...
    public ChangePasswordDTO() {}
    
    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
    
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}