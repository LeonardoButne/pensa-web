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

import java.util.List;

import com.pensa.api.models.ContactMessage;


@RestController
@RequestMapping("/contact")
@Tag(name = "Contact", description = "Gestão de contatos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/send")
    @Operation(summary = "Enviar mensagem de contato")
    public ResponseEntity<ApiResponse<String>> sendContactMessage(@Valid @RequestBody ContactMessageDTO messageDTO) {
        ApiResponse<String> response = contactService.sendContactMessage(messageDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/messages/unread/count")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Contar mensagens não lidas")
    public ResponseEntity<ApiResponse<Long>> getUnreadMessagesCount() {
        Long count = contactService.getUnreadMessagesCount();
        return ResponseEntity.ok(ApiResponse.success(count));
    }

    @GetMapping("/messages")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Listar todas as mensagens")
    public ResponseEntity<ApiResponse<Page<ContactMessage>>> getAllMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactMessage> messages = contactService.getAllMessages(pageable);
        return ResponseEntity.ok(ApiResponse.success(messages));
    }

    @GetMapping("/messages/unread")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Listar mensagens não lidas")
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getUnreadMessages() {
        List<ContactMessage> messages = contactService.getUnreadMessages();
        return ResponseEntity.ok(ApiResponse.success(messages));
    }

    @PutMapping("/messages/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Marcar mensagem como lida")
    public ResponseEntity<ApiResponse<String>> markMessageAsRead(@PathVariable Long id) {
        try {
            contactService.markAsRead(id);
            return ResponseEntity.ok(ApiResponse.success("Mensagem marcada como lida!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}