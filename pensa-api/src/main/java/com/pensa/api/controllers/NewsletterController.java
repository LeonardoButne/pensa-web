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
@RequestMapping("/newsletter")
@Tag(name = "Newsletter", description = "Gestão de newsletter")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NewsletterController {

    @Autowired
    private NewsletterService newsletterService;

    @PostMapping("/subscribe")
    @Operation(summary = "Inscrever-se na newsletter")
    public ResponseEntity<ApiResponse<String>> subscribe(@Valid @RequestBody NewsletterSubscriptionDTO subscriptionDTO) {
        ApiResponse<String> response = newsletterService.subscribe(subscriptionDTO);
        return response.isSuccess() ? ResponseEntity.ok(response) : ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/unsubscribe")
    @Operation(summary = "Cancelar inscrição na newsletter")
    public ResponseEntity<ApiResponse<String>> unsubscribe(@RequestParam String email) {
        ApiResponse<String> response = newsletterService.unsubscribe(email);
        return response.isSuccess() ? ResponseEntity.ok(response) : ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/count")
    @Operation(summary = "Número de inscritos ativos")
    public ResponseEntity<ApiResponse<Long>> getSubscriptionsCount() {
        Long count = newsletterService.getActiveSubscriptionsCount();
        return ResponseEntity.ok(ApiResponse.success(count));
    }
}