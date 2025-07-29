package com.example.backend.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class CategoryResponse {
    private Integer id;
    private List<TranslationResponse> translations;
}