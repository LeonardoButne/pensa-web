package com.pensa.api.repositories;

import com.pensa.api.models.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
    Page<ContactMessage> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    List<ContactMessage> findByIsReadFalseOrderByCreatedAtDesc();
    
    @Query("SELECT COUNT(c) FROM ContactMessage c WHERE c.isRead = false")
    Long countUnreadMessages();
}