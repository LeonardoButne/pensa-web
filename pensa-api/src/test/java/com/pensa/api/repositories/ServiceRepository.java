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
public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByIsActiveTrueOrderByNameAsc();
    Page<Service> findByIsActiveTrueOrderByNameAsc(Pageable pageable);
    
    List<Service> findByIsActiveTrueAndTypeOrderByNameAsc(Service.ServiceType type);
    
    @Query("SELECT s FROM Service s WHERE s.isActive = true AND " +
           "(LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Service> searchServices(@Param("keyword") String keyword, Pageable pageable);
}