package com.example.backend.dto.response;

import lombok.Data;

@Data
public class DrinkTranslationResponse {
    private String languageCode;
    private String name;
    private String description;
}