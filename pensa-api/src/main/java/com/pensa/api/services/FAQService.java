package com.pensa.api.services;

import com.pensa.api.dto.*;
import com.pensa.api.models.*;
import com.pensa.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FAQService {
    
    @Autowired
    private FAQRepository faqRepository;
    
    public List<FAQDTO> getAllFAQs() {
        return faqRepository.findByIsActiveTrueOrderByDisplayOrderAscCreatedAtAsc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FAQDTO> getFAQsByCategory(String category) {
        FAQ.Category cat = FAQ.Category.valueOf(category.toUpperCase());
        return faqRepository.findByIsActiveTrueAndCategoryOrderByDisplayOrderAscCreatedAtAsc(cat)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FAQDTO> searchFAQs(String keyword) {
        return faqRepository.searchFAQs(keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<FAQDTO> getFAQById(Long id) {
        return faqRepository.findById(id)
                .filter(FAQ::getIsActive)
                .map(this::convertToDTO);
    }
    
    private FAQDTO convertToDTO(FAQ faq) {
        FAQDTO dto = new FAQDTO();
        dto.setId(faq.getId());
        dto.setQuestion(faq.getQuestion());
        dto.setAnswer(faq.getAnswer());
        dto.setCategory(faq.getCategory().name());
        dto.setDisplayOrder(faq.getDisplayOrder());
        return dto;
    }

    public FAQDTO createFAQ(FAQDTO faqDTO) {
        FAQ faq = new FAQ();
        faq.setQuestion(faqDTO.getQuestion());
        faq.setAnswer(faqDTO.getAnswer());
        faq.setCategory(FAQ.Category.valueOf(faqDTO.getCategory().toUpperCase()));
        faq.setDisplayOrder(faqDTO.getDisplayOrder());
        faq.setIsActive(true);
        FAQ savedFAQ = faqRepository.save(faq);
        return convertToDTO(savedFAQ);
    }
}