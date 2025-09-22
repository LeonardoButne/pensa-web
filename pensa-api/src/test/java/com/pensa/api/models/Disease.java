package com.pensa.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "diseases")
public class Disease {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 200)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String symptoms;
    
    @Column(columnDefinition = "TEXT")
    private String treatment;
    
    @Column(columnDefinition = "TEXT")
    private String prevention;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @Column(name = "featured_week")
    private Integer featuredWeek;
    
    @Column(name = "featured_month")
    private Integer featuredMonth;
    
    @Column(name = "featured_year")
    private Integer featuredYear;
    
    @Enumerated(EnumType.STRING)
    private Category category;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DiseaseFile> files;
    
    public enum Category {
        INFECTIOUS_DISEASES,
        CHRONIC_DISEASES,
        GENETIC_DISEASES,
        AUTOIMMUNE_DISEASES,
        MENTAL_HEALTH,
        CARDIOVASCULAR,
        RESPIRATORY,
        GASTROINTESTINAL,
        MATERNAL_HEALTH,
        CHILD_HEALTH,
        OTHER
    }
    
    // Constructors
    public Disease() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Disease(String name, String description) {
        this();
        this.name = name;
        this.description = description;
    }
    
    // PrePersist and PreUpdate
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
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
    
    public Integer getFeaturedWeek() {
        return featuredWeek;
    }
    
    public void setFeaturedWeek(Integer featuredWeek) {
        this.featuredWeek = featuredWeek;
    }
    
    public Integer getFeaturedMonth() {
        return featuredMonth;
    }
    
    public void setFeaturedMonth(Integer featuredMonth) {
        this.featuredMonth = featuredMonth;
    }
    
    public Integer getFeaturedYear() {
        return featuredYear;
    }
    
    public void setFeaturedYear(Integer featuredYear) {
        this.featuredYear = featuredYear;
    }
    
    public Category getCategory() {
        return category;
    }
    
    public void setCategory(Category category) {
        this.category = category;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public List<DiseaseFile> getFiles() {
        return files;
    }
    
    public void setFiles(List<DiseaseFile> files) {
        this.files = files;
    }
}