package com.pensa.api.controllers;

import com.pensa.api.dto.*;
import com.pensa.api.services.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/projects")
@Tag(name = "Projects", description = "Gestão de projetos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    @Operation(summary = "Listar todos os projetos")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getAllProjects() {
        List<ProjectDTO> projects = projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/paginated")
    @Operation(summary = "Listar projetos com paginação")
    public ResponseEntity<ApiResponse<Page<ProjectDTO>>> getAllProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProjectDTO> projects = projectService.getAllProjects(pageable);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/featured")
    @Operation(summary = "Listar projetos em destaque")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getFeaturedProjects() {
        List<ProjectDTO> projects = projectService.getFeaturedProjects();
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar projeto por ID")
    public ResponseEntity<ApiResponse<ProjectDTO>> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(project -> ResponseEntity.ok(ApiResponse.success(project)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Buscar projetos por status")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getProjectsByStatus(@PathVariable String status) {
        try {
            List<ProjectDTO> projects = projectService.getProjectsByStatus(status);
            return ResponseEntity.ok(ApiResponse.success(projects));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/search")
    @Operation(summary = "Pesquisar projetos")
    public ResponseEntity<ApiResponse<Page<ProjectDTO>>> searchProjects(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProjectDTO> projects = projectService.searchProjects(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }
}