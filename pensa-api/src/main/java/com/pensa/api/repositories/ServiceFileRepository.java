package com.pensa.api.repositories;

import com.pensa.api.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceFileRepository extends JpaRepository<ServiceFile, Long> {
    List<ServiceFile> findByServiceId(Long serviceId);
    void deleteByServiceId(Long serviceId);
}