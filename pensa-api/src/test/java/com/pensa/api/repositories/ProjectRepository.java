package com.pensa.api.repositories;

import com.pensa.api.models.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByCreatedAtDesc();
    Page<Project> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    List<Project> findByIsFeaturedTrueOrderByCreatedAtDesc();
    List<Project> findByStatusOrderByCreatedAtDesc(Project.Status status);
    
    @Query("SELECT p FROM Project p WHERE " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.clientName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Project> searchProjects(@Param("keyword") String keyword, Pageable pageable);
}