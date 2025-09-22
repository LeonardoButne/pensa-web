package com.pensa.api.services;

import com.pensa.api.dto.*;
import com.pensa.api.exceptions.ResourceNotFoundException;
import com.pensa.api.models.Disease;
import com.pensa.api.repositories.DiseaseRepository;
import com.pensa.api.util.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DiseaseService {

    @Autowired
    private DiseaseRepository diseaseRepository;

    public List<DiseaseDTO> getAllDiseases() {
        return diseaseRepository.findByIsActiveTrueOrderByNameAsc()
                .stream()
                .map(DtoMapper::toDiseaseDTO)
                .collect(Collectors.toList());
    }

    public Page<DiseaseDTO> getAllDiseases(Pageable pageable) {
        return diseaseRepository.findByIsActiveTrueOrderByNameAsc(pageable)
                .map(DtoMapper::toDiseaseDTO);
    }

    public Optional<DiseaseDTO> getDiseaseById(Long id) {
        return diseaseRepository.findById(id)
                .filter(Disease::getIsActive)
                .map(DtoMapper::toDiseaseDTO);
    }

    public List<DiseaseDTO> getFeaturedDiseases() {
        return diseaseRepository.findFeaturedDiseases()
                .stream()
                .map(DtoMapper::toDiseaseDTO)
                .collect(Collectors.toList());
    }

    public Optional<DiseaseDTO> getFeaturedDiseaseOfWeek() {
        LocalDateTime now = LocalDateTime.now();
        int week = now.get(WeekFields.of(Locale.getDefault()).weekOfYear());
        int year = now.getYear();

        return diseaseRepository.findByFeaturedWeekAndYear(week, year)
                .map(DtoMapper::toDiseaseDTO);
    }

    public Optional<DiseaseDTO> getFeaturedDiseaseOfMonth() {
        LocalDateTime now = LocalDateTime.now();
        int month = now.getMonthValue();
        int year = now.getYear();

        return diseaseRepository.findByFeaturedMonthAndYear(month, year)
                .map(DtoMapper::toDiseaseDTO);
    }

    public DiseaseDTO createDisease(CreateDiseaseDTO createDiseaseDTO) {
        Disease disease = new Disease();
        disease.setName(createDiseaseDTO.getName());
        disease.setDescription(createDiseaseDTO.getDescription());
        disease.setSymptoms(createDiseaseDTO.getSymptoms());
        disease.setTreatment(createDiseaseDTO.getTreatment());
        disease.setPrevention(createDiseaseDTO.getPrevention());
        disease.setImageUrl(createDiseaseDTO.getImageUrl());

        if (createDiseaseDTO.getCategory() != null) {
            disease.setCategory(Disease.Category.valueOf(createDiseaseDTO.getCategory()));
        }

        disease = diseaseRepository.save(disease);
        return DtoMapper.toDiseaseDTO(disease);
    }

    public DiseaseDTO updateDisease(Long id, UpdateDiseaseDTO updateDiseaseDTO) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doença não encontrada com o ID: " + id));

        Optional.ofNullable(updateDiseaseDTO.getName()).ifPresent(disease::setName);
        Optional.ofNullable(updateDiseaseDTO.getDescription()).ifPresent(disease::setDescription);
        Optional.ofNullable(updateDiseaseDTO.getSymptoms()).ifPresent(disease::setSymptoms);
        Optional.ofNullable(updateDiseaseDTO.getTreatment()).ifPresent(disease::setTreatment);
        Optional.ofNullable(updateDiseaseDTO.getPrevention()).ifPresent(disease::setPrevention);
        Optional.ofNullable(updateDiseaseDTO.getImageUrl()).ifPresent(disease::setImageUrl);

        if (updateDiseaseDTO.getCategory() != null) {
            disease.setCategory(Disease.Category.valueOf(updateDiseaseDTO.getCategory()));
        }

        disease = diseaseRepository.save(disease);
        return DtoMapper.toDiseaseDTO(disease);
    }

    public void setDiseaseAsWeeklyFeatured(Long diseaseId) {
        // Encontra a doença atual da semana e a desativa (se existir)
        LocalDateTime now = LocalDateTime.now();
        int week = now.get(WeekFields.of(Locale.getDefault()).weekOfYear());
        int year = now.getYear();

        diseaseRepository.findByFeaturedWeekAndYear(week, year)
                .ifPresent(d -> {
                    d.setIsFeatured(false);
                    d.setFeaturedWeek(null);
                    d.setFeaturedYear(null);
                    diseaseRepository.save(d);
                });

        // Define a nova doença em destaque
        Disease newFeatured = diseaseRepository.findById(diseaseId)
                .orElseThrow(() -> new ResourceNotFoundException("Doença não encontrada com o ID: " + diseaseId));

        newFeatured.setIsFeatured(true);
        newFeatured.setFeaturedWeek(week);
        newFeatured.setFeaturedYear(year);
        diseaseRepository.save(newFeatured);
    }

    public void setDiseaseAsMonthlyFeatured(Long diseaseId) {
        // Encontra a doença atual do mês e a desativa (se existir)
        LocalDateTime now = LocalDateTime.now();
        int month = now.getMonthValue();
        int year = now.getYear();

        diseaseRepository.findByFeaturedMonthAndYear(month, year)
                .ifPresent(d -> {
                    d.setIsFeatured(false);
                    d.setFeaturedMonth(null);
                    d.setFeaturedYear(null);
                    diseaseRepository.save(d);
                });

        // Define a nova doença em destaque
        Disease newFeatured = diseaseRepository.findById(diseaseId)
                .orElseThrow(() -> new ResourceNotFoundException("Doença não encontrada com o ID: " + diseaseId));

        newFeatured.setIsFeatured(true);
        newFeatured.setFeaturedMonth(month);
        newFeatured.setFeaturedYear(year);
        diseaseRepository.save(newFeatured);
    }

    public void deleteDisease(Long id) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doença não encontrada com o ID: " + id));

        disease.setIsActive(false);
        diseaseRepository.save(disease);
    }

    public Page<DiseaseDTO> searchDiseases(String keyword, Pageable pageable) {
        return diseaseRepository.searchDiseases(keyword, pageable)
                .map(DtoMapper::toDiseaseDTO);
    }
}