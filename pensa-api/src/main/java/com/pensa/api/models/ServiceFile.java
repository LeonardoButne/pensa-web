package com.pensa.api.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "service_files")
public class ServiceFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String filename;

    @NotBlank
    @Column(name = "original_filename")
    private String originalFilename;

    @NotBlank
    @Column(name = "file_path")
    private String filePath;

    @NotBlank
    @Column(name = "content_type")
    private String contentType;

    private Long size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private BusinessService service;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Construtor padrão (necessário para JPA)
    public ServiceFile() {
    }

    // Construtor para a criação de novos ficheiros de serviço
    public ServiceFile(String filename, String originalFilename, String filePath, String contentType, Long size) {
        this.filename = filename;
        this.originalFilename = originalFilename;
        this.filePath = filePath;
        this.contentType = contentType;
        this.size = size;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public BusinessService getService() {
        return service;
    }

    public void setService(BusinessService service) {
        this.service = service;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Método de ciclo de vida para gerir a data de criação
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}