package com.pensa.api.repositories;

import com.pensa.api.models.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Long> {
    List<Disease> findByIsActiveTrueOrderByNameAsc();
    Page<Disease> findByIsActiveTrueOrderByNameAsc(Pageable pageable);
    
    @Query("SELECT d FROM Disease d WHERE d.isActive = true AND d.isFeatured = true")
    List<Disease> findFeaturedDiseases();
    
    @Query("SELECT d FROM Disease d WHERE d.isActive = true AND d.featuredWeek = :week AND d.featuredYear = :year")
    Optional<Disease> findByFeaturedWeekAndYear(@Param("week") Integer week, @Param("year") Integer year);
    
    @Query("SELECT d FROM Disease d WHERE d.isActive = true AND d.featuredMonth = :month AND d.featuredYear = :year")
    Optional<Disease> findByFeaturedMonthAndYear(@Param("month") Integer month, @Param("year") Integer year);
    
    List<Disease> findByIsActiveTrueAndCategoryOrderByNameAsc(Disease.Category category);
    
    @Query("SELECT d FROM Disease d WHERE d.isActive = true AND " +
           "(LOWER(d.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.symptoms) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Disease> searchDiseases(@Param("keyword") String keyword, Pageable pageable);
}