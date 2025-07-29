package com.example.backend.dto.request;

import lombok.Data;

@Data
public class TranslationRequest {
    private String languageCode;
    private String name;
}