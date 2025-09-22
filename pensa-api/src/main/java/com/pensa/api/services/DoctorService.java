package com.pensa.api.services;

import com.pensa.api.dto.*;
import com.pensa.api.models.*;
import com.pensa.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DoctorService {
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findByIsActiveTrueOrderByNameAsc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Page<DoctorDTO> getAllDoctors(Pageable pageable) {
        return doctorRepository.findByIsActiveTrueOrderByNameAsc(pageable)
                .map(this::convertToDTO);
    }
    
    public Optional<DoctorDTO> getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .filter(Doctor::getIsActive)
                .map(this::convertToDTO);
    }
    
    public List<DoctorDTO> getDoctorsBySpecialty(String specialty) {
        return doctorRepository.findByIsActiveTrueAndSpecialtyContainingIgnoreCaseOrderByNameAsc(specialty)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Page<DoctorDTO> searchDoctors(String keyword, Pageable pageable) {
        return doctorRepository.searchDoctors(keyword, pageable)
                .map(this::convertToDTO);
    }
    
    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setSpecialty(doctor.getSpecialty());
        dto.setEmail(doctor.getEmail());
        dto.setPhone(doctor.getPhone());
        dto.setAddress(doctor.getAddress());
        dto.setBiography(doctor.getBiography());
        dto.setImageUrl(doctor.getImageUrl());
        return dto;
    }
}