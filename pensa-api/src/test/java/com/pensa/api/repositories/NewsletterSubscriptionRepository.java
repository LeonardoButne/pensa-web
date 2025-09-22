package com.pensa.api.repositories;

import com.pensa.api.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NewsletterSubscriptionRepository extends JpaRepository<NewsletterSubscription, Long> {
    Optional<NewsletterSubscription> findByEmail(String email);
    List<NewsletterSubscription> findByIsActiveTrueOrderBySubscribedAtDesc();
    Boolean existsByEmailAndIsActiveTrue(String email);
    
    @Query("SELECT COUNT(n) FROM NewsletterSubscription n WHERE n.isActive = true")
    Long countActiveSubscriptions();
}