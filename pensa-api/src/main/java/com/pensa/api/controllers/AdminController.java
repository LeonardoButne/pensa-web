package com.pensa.api.controllers;

import com.pensa.api.services.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.pensa.api.dto.ApiResponse;
import com.pensa.api.dto.UserDTO;
import com.pensa.api.dto.DashboardStatsDTO;
import com.pensa.api.models.NewsletterSubscription;

@RestController
@RequestMapping("/admin")
@Tag(name = "Admin", description = "Área administrativa")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private NewsletterService newsletterService;

    @Autowired
    private ContactService contactService;

    @GetMapping("/users")
    @Operation(summary = "Listar todos os usuários")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Buscar usuário por ID")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(ApiResponse.success(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Desativar usuário")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(ApiResponse.success("Usuário desativado com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/newsletter/subscriptions")
    @Operation(summary = "Listar todas as inscrições da newsletter")
    public ResponseEntity<ApiResponse<List<NewsletterSubscription>>> getAllSubscriptions() {
        List<NewsletterSubscription> subscriptions = newsletterService.getAllActiveSubscriptions();
        return ResponseEntity.ok(ApiResponse.success(subscriptions));
    }

    @GetMapping("/dashboard/stats")
    @Operation(summary = "Estatísticas do dashboard")
    public ResponseEntity<ApiResponse<DashboardStatsDTO>> getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        stats.setActiveUsersCount(userService.getAllUsers().size());
        stats.setNewsletterSubscriptionsCount(newsletterService.getActiveSubscriptionsCount());
        stats.setUnreadMessagesCount(contactService.getUnreadMessagesCount());
        // Add more stats as needed
        
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}