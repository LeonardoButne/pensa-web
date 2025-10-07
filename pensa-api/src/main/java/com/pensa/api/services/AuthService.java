package com.pensa.api.services;

import com.pensa.api.dto.CreateUserDTO;
import com.pensa.api.dto.LoginRequestDTO;
import com.pensa.api.dto.LoginResponseDTO;
import com.pensa.api.dto.UserDTO;
import com.pensa.api.models.User;
import com.pensa.api.repositories.UserRepository;
import com.pensa.api.security.jwt.JwtUtils;
import com.pensa.api.security.services.UserPrinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    public LoginResponseDTO authenticateUser(LoginRequestDTO loginRequest) {
        try {
            // Authenticate user credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), 
                            loginRequest.getPassword())
            );

            // Set authentication in security context
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // Generate JWT token
            String jwt = jwtUtils.generateJwtToken(authentication);

            // Get user details
            UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();
            
            // Find user in database to get role
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            // Return response with token and user info
            return new LoginResponseDTO(
                    jwt,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().name()
            );
            
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Credenciais inválidas!");
        } catch (Exception e) {
            throw new RuntimeException("Erro durante a autenticação: " + e.getMessage());
        }
    }

    public UserDTO registerUser(CreateUserDTO signUpRequest) {
        // Validate username
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Username já está sendo usado!");
        }

        // Validate email
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email já está sendo usado!");
        }

        // Create user through UserService
        return userService.createUser(signUpRequest);
    }
    
    public UserDTO createAdminUser(CreateUserDTO signUpRequest) {
        // Validate username
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Username já está sendo usado!");
        }

        // Validate email
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email já está sendo usado!");
        }

        // Create admin user
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setRole(User.Role.ADMIN); // Set as admin
        
        user = userRepository.save(user);
        return convertToDTO(user);
    }
    
    public boolean validateToken(String token) {
        return jwtUtils.validateJwtToken(token);
    }
    
    public String getUsernameFromToken(String token) {
        return jwtUtils.getUserNameFromJwtToken(token);
    }
    
    public UserDTO getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserPrinciple) {
            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            return userRepository.findById(userPrincipal.getId())
                    .map(this::convertToDTO)
                    .orElseThrow(() -> new RuntimeException("Usuário atual não encontrado"));
        }
        throw new RuntimeException("Usuário não autenticado");
    }
    
    public void changePassword(String oldPassword, String newPassword) {
        UserDTO currentUser = getCurrentUser();
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Verify old password
        if (!encoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Senha atual incorreta!");
        }
        
        // Update password
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);
    }
    
    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com este email"));
        
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);
    }
    
    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }
    
    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }
    
    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setIsActive(user.getIsActive());
        return dto;
    }
}