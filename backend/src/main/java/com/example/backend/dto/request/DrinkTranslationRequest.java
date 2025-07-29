package com.example.backend.dto.request;

import lombok.Data;

@Data
public class DrinkTranslationRequest {
    private String languageCode;
    private String name;
    private String description;
}
