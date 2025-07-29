package com.example.backend.dto.response;

import lombok.Data;

@Data
public class TranslationResponse {
    private String languageCode;
    private String name;
}