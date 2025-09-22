package com.pensa.api.services;

import com.pensa.api.dto.*;
import com.pensa.api.models.*;
import com.pensa.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Page<ProjectDTO> getAllProjects(Pageable pageable) {
        return projectRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::convertToDTO);
    }
    
    public List<ProjectDTO> getFeaturedProjects() {
        return projectRepository.findByIsFeaturedTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<ProjectDTO> getProjectById(Long id) {
        return projectRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public List<ProjectDTO> getProjectsByStatus(String status) {
        Project.Status projectStatus = Project.Status.valueOf(status.toUpperCase());
        return projectRepository.findByStatusOrderByCreatedAtDesc(projectStatus)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Page<ProjectDTO> searchProjects(String keyword, Pageable pageable) {
        return projectRepository.searchProjects(keyword, pageable)
                .map(this::convertToDTO);
    }
    
    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setTitle(project.getTitle());
        dto.setDescription(project.getDescription());
        dto.setClientName(project.getClientName());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setStatus(project.getStatus().name());
        dto.setImageUrl(project.getImageUrl());
        dto.setIsFeatured(project.getIsFeatured());
        return dto;
    }
}