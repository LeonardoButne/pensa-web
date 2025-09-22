package com.pensa.api.util;

import com.pensa.api.dto.DiseaseDTO;
import com.pensa.api.models.Disease;

public class DtoMapper {

    public static DiseaseDTO toDiseaseDTO(Disease disease) {
        if (disease == null) {
            return null;
        }
        DiseaseDTO dto = new DiseaseDTO();
        dto.setId(disease.getId());
        dto.setName(disease.getName());
        dto.setDescription(disease.getDescription());
        dto.setSymptoms(disease.getSymptoms());
        dto.setTreatment(disease.getTreatment());
        dto.setPrevention(disease.getPrevention());
        dto.setImageUrl(disease.getImageUrl());
        dto.setIsFeatured(disease.getIsFeatured());
        dto.setCategory(disease.getCategory() != null ? disease.getCategory().name() : null);
        dto.setCreatedAt(disease.getCreatedAt());
        return dto;
    }
}