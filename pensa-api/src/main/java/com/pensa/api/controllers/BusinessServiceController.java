
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
@RequestMapping("/services")
@Tag(name = "Services", description = "Gestão de serviços")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BusinessServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping
    @Operation(summary = "Listar todos os serviços")
    public ResponseEntity<ApiResponse<List<ServiceDTO>>> getAllServices() {
        List<ServiceDTO> services = serviceService.getAllServices();
        return ResponseEntity.ok(ApiResponse.success(services));
    }

    @GetMapping("/paginated")
    @Operation(summary = "Listar serviços com paginação")
    public ResponseEntity<ApiResponse<Page<ServiceDTO>>> getAllServices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ServiceDTO> services = serviceService.getAllServices(pageable);
        return ResponseEntity.ok(ApiResponse.success(services));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar serviço por ID")
    public ResponseEntity<ApiResponse<ServiceDTO>> getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id)
                .map(service -> ResponseEntity.ok(ApiResponse.success(service)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    @Operation(summary = "Buscar serviços por tipo")
    public ResponseEntity<ApiResponse<List<ServiceDTO>>> getServicesByType(@PathVariable String type) {
        try {
            List<ServiceDTO> services = serviceService.getServicesByType(type);
            return ResponseEntity.ok(ApiResponse.success(services));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/search")
    @Operation(summary = "Pesquisar serviços")
    public ResponseEntity<ApiResponse<Page<ServiceDTO>>> searchServices(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ServiceDTO> services = serviceService.searchServices(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.success(services));
    }
}