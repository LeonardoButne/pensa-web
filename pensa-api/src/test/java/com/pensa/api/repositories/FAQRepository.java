package com.pensa.api.repositories;

import com.pensa.api.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {
    List<FAQ> findByIsActiveTrueOrderByDisplayOrderAscCreatedAtAsc();
    List<FAQ> findByIsActiveTrueAndCategoryOrderByDisplayOrderAscCreatedAtAsc(FAQ.Category category);
    
    @Query("SELECT f FROM FAQ f WHERE f.isActive = true AND " +
           "(LOWER(f.question) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.answer) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<FAQ> searchFAQs(@Param("keyword") String keyword);
}