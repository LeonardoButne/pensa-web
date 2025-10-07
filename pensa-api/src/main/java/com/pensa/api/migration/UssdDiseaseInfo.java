package com.pensa.api.migration;

public class UssdDiseaseInfo {
    
    // Assumindo que você também precise dos campos list_number e disease_submenu_id
    // baseados na descrição da sua tabela 'disease_info'
    private Long diseaseId;
    private Long diseaseConcernId;
    private String info;
    private Integer diseaseListNumber;
    private Long diseaseSubmenuId;

    // Getters and Setters

    public Long getDiseaseId() {
        return diseaseId;
    }

    public void setDiseaseId(Long diseaseId) {
        this.diseaseId = diseaseId;
    }

    public Long getDiseaseConcernId() {
        return diseaseConcernId;
    }

    public void setDiseaseConcernId(Long diseaseConcernId) {
        this.diseaseConcernId = diseaseConcernId;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Integer getDiseaseListNumber() {
        return diseaseListNumber;
    }

    public void setDiseaseListNumber(Integer diseaseListNumber) {
        this.diseaseListNumber = diseaseListNumber;
    }

    public Long getDiseaseSubmenuId() {
        return diseaseSubmenuId;
    }

    public void setDiseaseSubmenuId(Long diseaseSubmenuId) {
        this.diseaseSubmenuId = diseaseSubmenuId;
    }
}