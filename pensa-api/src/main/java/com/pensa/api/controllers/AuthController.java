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
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Endpoints de autenticação")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    @Operation(summary = "Login do usuário")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            LoginResponseDTO response = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/signup")
    @Operation(summary = "Registro de novo usuário")
    public ResponseEntity<ApiResponse<UserDTO>> registerUser(@Valid @RequestBody CreateUserDTO signUpRequest) {
        try {
            UserDTO user = authService.registerUser(signUpRequest);
            return ResponseEntity.ok(ApiResponse.success("Usuário registrado com sucesso!", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/admin/create")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Criar usuário administrador")
    public ResponseEntity<ApiResponse<UserDTO>> createAdminUser(@Valid @RequestBody CreateUserDTO signUpRequest) {
        try {
            UserDTO user = authService.createAdminUser(signUpRequest);
            return ResponseEntity.ok(ApiResponse.success("Administrador criado com sucesso!", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/me")
    @Operation(summary = "Obter dados do usuário atual")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser() {
        try {
            UserDTO user = authService.getCurrentUser();
            return ResponseEntity.ok(ApiResponse.success(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/change-password")
    @Operation(summary = "Alterar senha do usuário")
    public ResponseEntity<ApiResponse<String>> changePassword(@Valid @RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            authService.changePassword(changePasswordDTO.getOldPassword(), changePasswordDTO.getNewPassword());
            return ResponseEntity.ok(ApiResponse.success("Senha alterada com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Resetar senha por email")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordDTO resetPasswordDTO) {
        try {
            authService.resetPassword(resetPasswordDTO.getEmail(), resetPasswordDTO.getNewPassword());
            return ResponseEntity.ok(ApiResponse.success("Senha resetada com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/check-username")
    @Operation(summary = "Verificar disponibilidade do username")
    public ResponseEntity<ApiResponse<Boolean>> checkUsernameAvailability(@RequestParam String username) {
        boolean available = authService.isUsernameAvailable(username);
        return ResponseEntity.ok(ApiResponse.success(available));
    }

    @GetMapping("/check-email")
    @Operation(summary = "Verificar disponibilidade do email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmailAvailability(@RequestParam String email) {
        boolean available = authService.isEmailAvailable(email);
        return ResponseEntity.ok(ApiResponse.success(available));
    }

    @PostMapping("/validate-token")
    @Operation(summary = "Validar token JWT")
    public ResponseEntity<ApiResponse<Boolean>> validateToken(@RequestParam String token) {
        boolean valid = authService.validateToken(token);
        return ResponseEntity.ok(ApiResponse.success(valid));
    }
}