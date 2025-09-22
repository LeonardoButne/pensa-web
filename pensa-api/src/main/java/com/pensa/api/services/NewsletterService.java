package com.pensa.api.services;

import com.pensa.api.dto.*;
import com.pensa.api.models.*;
import com.pensa.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NewsletterService {
    
    @Autowired
    private NewsletterSubscriptionRepository subscriptionRepository;
    
    @Autowired
    private EmailService emailService;
    
    public ApiResponse<String> subscribe(NewsletterSubscriptionDTO subscriptionDTO) {
        if (subscriptionRepository.existsByEmailAndIsActiveTrue(subscriptionDTO.getEmail())) {
            return ApiResponse.error("Email já está inscrito na newsletter!");
        }
        
        NewsletterSubscription subscription = new NewsletterSubscription();
        subscription.setEmail(subscriptionDTO.getEmail());
        subscription.setName(subscriptionDTO.getName());
        subscription.setSubscribedAt(LocalDateTime.now());
        
        subscriptionRepository.save(subscription);
        
        // Send welcome email
        try {
            emailService.sendWelcomeEmail(subscription.getEmail(), subscription.getName());
        } catch (Exception e) {
            // Log error but don't fail the subscription
        }
        
        return ApiResponse.success("Inscrição realizada com sucesso!");
    }
    
    public ApiResponse<String> unsubscribe(String email) {
        Optional<NewsletterSubscription> subscription = subscriptionRepository.findByEmail(email);
        
        if (subscription.isEmpty() || !subscription.get().getIsActive()) {
            return ApiResponse.error("Email não encontrado na lista de newsletter!");
        }
        
        NewsletterSubscription sub = subscription.get();
        sub.setIsActive(false);
        sub.setUnsubscribedAt(LocalDateTime.now());
        subscriptionRepository.save(sub);
        
        return ApiResponse.success("Inscrição cancelada com sucesso!");
    }
    
    public List<NewsletterSubscription> getAllActiveSubscriptions() {
        return subscriptionRepository.findByIsActiveTrueOrderBySubscribedAtDesc();
    }
    
    public Long getActiveSubscriptionsCount() {
        return subscriptionRepository.countActiveSubscriptions();
    }
}