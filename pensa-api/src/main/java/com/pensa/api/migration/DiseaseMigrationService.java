package com.pensa.api.migration;

import com.pensa.api.models.Disease;
import com.pensa.api.repositories.DiseaseRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections; // Import necessário para Collections.emptyMap()
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DiseaseMigrationService {

    private final JdbcTemplate ussdJdbcTemplate;
    private final DiseaseRepository webDiseaseRepository;

    public DiseaseMigrationService(
            @Qualifier("ussdJdbcTemplate") JdbcTemplate ussdJdbcTemplate, 
            DiseaseRepository webDiseaseRepository) {
        this.ussdJdbcTemplate = ussdJdbcTemplate;
        this.webDiseaseRepository = webDiseaseRepository;
    }

    @Transactional
    public void runMigration() {
        // 1. EXTRAÇÃO: Buscar dados USSD
        List<Map<String, Object>> ussdDiseases = ussdJdbcTemplate.queryForList("SELECT id, name FROM disease");
        List<Map<String, Object>> ussdConcerns = ussdJdbcTemplate.queryForList("SELECT id, name FROM disease_concern");
        List<Map<String, Object>> ussdInfos = ussdJdbcTemplate.queryForList("SELECT disease_id, disease_concern_id, info FROM disease_info");

        // Mapear Concerns para um Lookup (ID -> Nome) - CORREÇÃO 1
        Map<Long, String> concernMap = ussdConcerns.stream()
            .collect(Collectors.toMap(
                // Correção de Integer para Long
                c -> ((Integer) c.get("id")).longValue(), 
                c -> (String) c.get("name")
            ));
        
        // 2. TRANSFORMAÇÃO: Agrupar Infos por Doença e Tipo (Concern)
        Map<Long, Map<String, String>> transformedData = new HashMap<>();

        for (Map<String, Object> info : ussdInfos) {
            // CORREÇÃO 2: Conversão de disease_id e disease_concern_id
            Long diseaseId = ((Integer) info.get("disease_id")).longValue();
            Long concernId = ((Integer) info.get("disease_concern_id")).longValue();
            
            String infoText = (String) info.get("info");
            String concernName = concernMap.get(concernId);

            // Se o concernName não for encontrado (dado sujo), pulamos
            if (concernName == null) {
                System.err.println("Aviso: Concern ID " + concernId + " não encontrado para a doença " + diseaseId);
                continue;
            }

            transformedData.putIfAbsent(diseaseId, new HashMap<>());
            
            // Adicionar ao texto existente, separando por nova linha
            String currentInfo = transformedData.get(diseaseId).getOrDefault(concernName, "");
            
            // Lógica para evitar "\n" no início da string
            if (currentInfo.isEmpty()) {
                transformedData.get(diseaseId).put(concernName, infoText);
            } else {
                transformedData.get(diseaseId).put(concernName, currentInfo + "\n" + infoText);
            }
        }

        // 3. LOAD: Mapear para o modelo WEB e salvar
        List<Disease> webDiseases = ussdDiseases.stream()
            .map(ussd -> {
                // CORREÇÃO 3: Conversão do ID da doença principal
                Long id = ((Integer) ussd.get("id")).longValue();
                String name = (String) ussd.get("name");
                
                // Usando Collections.emptyMap() para compatibilidade e segurança
                Map<String, String> infoDetails = transformedData.getOrDefault(id, Collections.emptyMap());
                
                Disease webDisease = new Disease();
                webDisease.setName(name);
                
                // Mapeamento Chave: (USSD Concern Name) -> (WEB Field)
                webDisease.setSymptoms(infoDetails.getOrDefault("SINTOMAS", infoDetails.getOrDefault("Symptoms", null)));
                webDisease.setTreatment(infoDetails.getOrDefault("TRATAMENTO", infoDetails.getOrDefault("Treatment", null)));
                webDisease.setPrevention(infoDetails.getOrDefault("PREVENÇÃO", infoDetails.getOrDefault("Prevention", null)));
                
                // Definir campos padrão
                webDisease.setDescription("Descrição importada de USSD.");
                webDisease.setCategory(Disease.Category.OTHER);
                
                return webDisease;
            })
            .collect(Collectors.toList());

        // 4. Salvar todos no banco de dados WEB
        webDiseaseRepository.saveAll(webDiseases);
        System.out.println("Migração concluída! " + webDiseases.size() + " doenças importadas.");
    }
}