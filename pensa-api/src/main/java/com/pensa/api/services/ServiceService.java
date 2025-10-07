package com.pensa.api.services;

import com.pensa.api.dto.*;
import com.pensa.api.repositories.*;
import com.pensa.api.models.BusinessService;
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
public class ServiceService {
    
    @Autowired
    private BusinessServiceRepository serviceRepository;
    
    public List<ServiceDTO> getAllServices() {
        return serviceRepository.findByIsActiveTrueOrderByNameAsc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Page<ServiceDTO> getAllServices(Pageable pageable) {
        return serviceRepository.findByIsActiveTrueOrderByNameAsc(pageable)
                .map(this::convertToDTO);
    }
    
    public Optional<ServiceDTO> getServiceById(Long id) {
        return serviceRepository.findById(id)
                .filter(BusinessService::getIsActive)
                .map(this::convertToDTO);
    }
    
    public List<ServiceDTO> getServicesByType(String type) {
        BusinessService.ServiceType serviceType = BusinessService.ServiceType.valueOf(type.toUpperCase());
        return serviceRepository.findByIsActiveTrueAndTypeOrderByNameAsc(serviceType)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Page<ServiceDTO> searchServices(String keyword, Pageable pageable) {
        return serviceRepository.searchServices(keyword, pageable)
                .map(this::convertToDTO);
    }
    
    private ServiceDTO convertToDTO(BusinessService service) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setImageUrl(service.getImageUrl());
        dto.setType(service.getType().name());
        return dto;
    }
}