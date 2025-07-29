package com.example.backend.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class SizeResponse {
    private Integer id;
    private BigDecimal priceModifier;
    private List<TranslationResponse> translations;
}