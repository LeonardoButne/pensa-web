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
@RequestMapping("/faq")
@Tag(name = "FAQ", description = "Perguntas Frequentes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FAQController {

    @Autowired
    private FAQService faqService;

    @GetMapping
    @Operation(summary = "Listar todas as FAQs")
    public ResponseEntity<ApiResponse<List<FAQDTO>>> getAllFAQs() {
        List<FAQDTO> faqs = faqService.getAllFAQs();
        return ResponseEntity.ok(ApiResponse.success(faqs));
    }

        @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Criar uma nova FAQ")
    public ResponseEntity<ApiResponse<FAQDTO>> createFAQ(@Valid @RequestBody FAQDTO faqDTO) {
        try {
            FAQDTO createdFAQ = faqService.createFAQ(faqDTO);
            return ResponseEntity.ok(ApiResponse.success(createdFAQ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }


    @GetMapping("/category/{category}")
    @Operation(summary = "Listar FAQs por categoria")
    public ResponseEntity<ApiResponse<List<FAQDTO>>> getFAQsByCategory(@PathVariable String category) {
        try {
            List<FAQDTO> faqs = faqService.getFAQsByCategory(category);
            return ResponseEntity.ok(ApiResponse.success(faqs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar FAQ por ID")
    public ResponseEntity<ApiResponse<FAQDTO>> getFAQById(@PathVariable Long id) {
        return faqService.getFAQById(id)
                .map(faq -> ResponseEntity.ok(ApiResponse.success(faq)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    @Operation(summary = "Pesquisar FAQs")
    public ResponseEntity<ApiResponse<List<FAQDTO>>> searchFAQs(@RequestParam String keyword) {
        List<FAQDTO> faqs = faqService.searchFAQs(keyword);
        return ResponseEntity.ok(ApiResponse.success(faqs));
    }
}