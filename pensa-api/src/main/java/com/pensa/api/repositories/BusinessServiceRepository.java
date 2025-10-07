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
public interface BusinessServiceRepository extends JpaRepository<BusinessService, Long> {
    List<BusinessService> findByIsActiveTrueOrderByNameAsc();
    Page<BusinessService> findByIsActiveTrueOrderByNameAsc(Pageable pageable);
    
    List<BusinessService> findByIsActiveTrueAndTypeOrderByNameAsc(BusinessService.ServiceType type);
    
    @Query("SELECT s FROM BusinessService s WHERE s.isActive = true AND " +
           "(LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<BusinessService> searchServices(@Param("keyword") String keyword, Pageable pageable);
}