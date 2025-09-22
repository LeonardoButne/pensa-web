package com.pensa.api.services;

import com.pensa.api.dto.*;
import com.pensa.api.models.*;
import com.pensa.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendWelcomeEmail(String to, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Bem-vindo à Newsletter da PENSA!");
        message.setText(String.format(
            "Olá %s,\n\n" +
            "Obrigado por se inscrever na nossa newsletter!\n" +
            "Você receberá as últimas informações sobre saúde e bem-estar.\n\n" +
            "Atenciosamente,\n" +
            "Equipe PENSA", 
            name != null ? name : ""));
        
        mailSender.send(message);
    }
    
    public void sendContactNotificationEmail(ContactMessage contactMessage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("admin@pensa.com"); // Configure admin email
        message.setSubject("Nova mensagem de contato: " + contactMessage.getSubject());
        message.setText(String.format(
            "Nova mensagem de contato recebida:\n\n" +
            "Nome: %s\n" +
            "Email: %s\n" +
            "Telefone: %s\n" +
            "Assunto: %s\n\n" +
            "Mensagem:\n%s",
            contactMessage.getName(),
            contactMessage.getEmail(),
            contactMessage.getPhone(),
            contactMessage.getSubject(),
            contactMessage.getMessage()));
        
        mailSender.send(message);
    }
}