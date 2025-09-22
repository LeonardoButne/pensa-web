package com.pensa.api.services;

import com.pensa.api.dto.*;
import com.pensa.api.models.*;
import com.pensa.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ContactService {
    
    @Autowired
    private ContactMessageRepository messageRepository;
    
    @Autowired
    private EmailService emailService;
    
    public ApiResponse<String> sendContactMessage(ContactMessageDTO messageDTO) {
        ContactMessage message = new ContactMessage();
        message.setName(messageDTO.getName());
        message.setEmail(messageDTO.getEmail());
        message.setPhone(messageDTO.getPhone());
        message.setSubject(messageDTO.getSubject());
        message.setMessage(messageDTO.getMessage());
        message.setCreatedAt(LocalDateTime.now());
        
        messageRepository.save(message);
        
        // Send notification email to admin
        try {
            emailService.sendContactNotificationEmail(message);
        } catch (Exception e) {
            // Log error but don't fail the message saving
        }
        
        return ApiResponse.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    }
    
    public List<ContactMessage> getAllMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Page<ContactMessage> getAllMessages(Pageable pageable) {
        return messageRepository.findAllByOrderByCreatedAtDesc(pageable);
    }
    
    public List<ContactMessage> getUnreadMessages() {
        return messageRepository.findByIsReadFalseOrderByCreatedAtDesc();
    }
    
    public void markAsRead(Long messageId) {
        ContactMessage message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Mensagem não encontrada"));
        message.setIsRead(true);
        messageRepository.save(message);
    }
    
    public Long getUnreadMessagesCount() {
        return messageRepository.countUnreadMessages();
    }
}