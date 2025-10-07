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
@RequestMapping("/files")
@Tag(name = "File Management", description = "Gestão de arquivos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Upload de arquivo")
    public ResponseEntity<ApiResponse<String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "general") String directory) {
        try {
            String filePath = fileStorageService.storeFile(file, directory);
            return ResponseEntity.ok(ApiResponse.success("Arquivo enviado com sucesso!", filePath));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Deletar arquivo")
    public ResponseEntity<ApiResponse<String>> deleteFile(@RequestParam String filePath) {
        try {
            fileStorageService.deleteFile(filePath);
            return ResponseEntity.ok(ApiResponse.success("Arquivo deletado com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/exists")
    @Operation(summary = "Verificar se arquivo existe")
    public ResponseEntity<ApiResponse<Boolean>> fileExists(@RequestParam String filePath) {
        boolean exists = fileStorageService.fileExists(filePath);
        return ResponseEntity.ok(ApiResponse.success(exists));
    }
}
