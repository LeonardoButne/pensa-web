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
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByIsActiveTrueOrderByNameAsc();
    Page<Doctor> findByIsActiveTrueOrderByNameAsc(Pageable pageable);
    
    List<Doctor> findByIsActiveTrueAndSpecialtyContainingIgnoreCaseOrderByNameAsc(String specialty);
    
    @Query("SELECT d FROM Doctor d WHERE d.isActive = true AND " +
           "(LOWER(d.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.specialty) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Doctor> searchDoctors(@Param("keyword") String keyword, Pageable pageable);
}