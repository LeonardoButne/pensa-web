package com.pensa.api.repositories;

import com.pensa.api.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiseaseFileRepository extends JpaRepository<DiseaseFile, Long> {
    List<DiseaseFile> findByDiseaseId(Long diseaseId);
    void deleteByDiseaseId(Long diseaseId);
}