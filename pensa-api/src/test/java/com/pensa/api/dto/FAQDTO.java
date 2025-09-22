package com.pensa.api.dto;

public class FAQDTO {

    private Long id;
    private String question;
    private String answer;
    private String category;
    private Integer displayOrder;

    // Construtor padrão (necessário para a desserialização)
    public FAQDTO() {}

    // Construtor com todos os campos
    public FAQDTO(Long id, String question, String answer, String category, Integer displayOrder) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.displayOrder = displayOrder;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}