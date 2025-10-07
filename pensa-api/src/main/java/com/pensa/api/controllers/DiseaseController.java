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
@RequestMapping("/diseases")
@Tag(name = "Diseases", description = "Gestão de doenças")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;

    @GetMapping
    @Operation(summary = "Listar todas as doenças")
    public ResponseEntity<ApiResponse<List<DiseaseDTO>>> getAllDiseases() {
        List<DiseaseDTO> diseases = diseaseService.getAllDiseases();
        return ResponseEntity.ok(ApiResponse.success(diseases));
    }

    @GetMapping("/paginated")
    @Operation(summary = "Listar doenças com paginação")
    public ResponseEntity<ApiResponse<Page<DiseaseDTO>>> getAllDiseases(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DiseaseDTO> diseases = diseaseService.getAllDiseases(pageable);
        return ResponseEntity.ok(ApiResponse.success(diseases));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar doença por ID")
    public ResponseEntity<ApiResponse<DiseaseDTO>> getDiseaseById(@PathVariable Long id) {
        return diseaseService.getDiseaseById(id)
                .map(disease -> ResponseEntity.ok(ApiResponse.success(disease)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/featured")
    @Operation(summary = "Listar doenças em destaque")
    public ResponseEntity<ApiResponse<List<DiseaseDTO>>> getFeaturedDiseases() {
        List<DiseaseDTO> diseases = diseaseService.getFeaturedDiseases();
        return ResponseEntity.ok(ApiResponse.success(diseases));
    }

    @GetMapping("/featured/week")
    @Operation(summary = "Doença em destaque da semana")
    public ResponseEntity<ApiResponse<DiseaseDTO>> getFeaturedDiseaseOfWeek() {
        return diseaseService.getFeaturedDiseaseOfWeek()
                .map(disease -> ResponseEntity.ok(ApiResponse.success(disease)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/featured/month")
    @Operation(summary = "Doença em destaque do mês")
    public ResponseEntity<ApiResponse<DiseaseDTO>> getFeaturedDiseaseOfMonth() {
        return diseaseService.getFeaturedDiseaseOfMonth()
                .map(disease -> ResponseEntity.ok(ApiResponse.success(disease)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    @Operation(summary = "Pesquisar doenças")
    public ResponseEntity<ApiResponse<Page<DiseaseDTO>>> searchDiseases(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DiseaseDTO> diseases = diseaseService.searchDiseases(keyword, pageable);
        return ResponseEntity.ok(ApiResponse.success(diseases));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Criar nova doença")
    public ResponseEntity<ApiResponse<DiseaseDTO>> createDisease(@Valid @RequestBody CreateDiseaseDTO createDiseaseDTO) {
        try {
            DiseaseDTO disease = diseaseService.createDisease(createDiseaseDTO);
            return ResponseEntity.ok(ApiResponse.success("Doença criada com sucesso!", disease));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Atualizar doença")
    public ResponseEntity<ApiResponse<DiseaseDTO>> updateDisease(@PathVariable Long id, @Valid @RequestBody UpdateDiseaseDTO updateDiseaseDTO) {
        try {
            DiseaseDTO disease = diseaseService.updateDisease(id, updateDiseaseDTO);
            return ResponseEntity.ok(ApiResponse.success("Doença atualizada com sucesso!", disease));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/{id}/feature/week")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Definir doença como destaque da semana")
    public ResponseEntity<ApiResponse<String>> setDiseaseAsWeeklyFeatured(@PathVariable Long id) {
        try {
            diseaseService.setDiseaseAsWeeklyFeatured(id);
            return ResponseEntity.ok(ApiResponse.success("Doença definida como destaque da semana!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/{id}/feature/month")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Definir doença como destaque do mês")
    public ResponseEntity<ApiResponse<String>> setDiseaseAsMonthlyFeatured(@PathVariable Long id) {
        try {
            diseaseService.setDiseaseAsMonthlyFeatured(id);
            return ResponseEntity.ok(ApiResponse.success("Doença definida como destaque do mês!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Deletar doença")
    public ResponseEntity<ApiResponse<String>> deleteDisease(@PathVariable Long id) {
        try {
            diseaseService.deleteDisease(id);
            return ResponseEntity.ok(ApiResponse.success("Doença deletada com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}