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
@RequestMapping("/doctors")
@Tag(name = "Doctors", description = "Gestão de médicos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    @Operation(summary = "Listar todos os médicos")
    public ResponseEntity<ApiResponse<List<DoctorDTO>>> getAllDoctors() {
        List<DoctorDTO> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(ApiResponse.success(doctors));
    }

    @GetMapping("/paginated")
    @Operation(summary = "Listar médicos com paginação")
    public ResponseEntity<ApiResponse<Page<DoctorDTO>>> getAllDoctors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DoctorDTO> doctors = doctorService.getAllDoctors(pageable);
        return ResponseEntity.ok(ApiResponse.success(doctors));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar médico por ID")
    public ResponseEntity<ApiResponse<DoctorDTO>> getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id)
                .map(doctor -> ResponseEntity.ok(ApiResponse.success(doctor)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/specialty/{specialty}")
    @Operation(summary = "Buscar médicos por especialidade")
    public ResponseEntity<ApiResponse<List<DoctorDTO>>> getDoctorsBySpecialty(@PathVariable String specialty) {
        List<DoctorDTO> doctors = doctorService.getDoctorsBySpecialty(specialty);
        return ResponseEntity.ok(ApiResponse.success(doctors));
    }

    @GetMapping("/search")
    @Operation(summary = "Pesquisar médicos")
    public ResponseEntity<ApiResponse<Page<DoctorDTO>>> searchDoctors(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DoctorDTO> doctors = doctorService.searchDoctors(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.success(doctors));
    }
}