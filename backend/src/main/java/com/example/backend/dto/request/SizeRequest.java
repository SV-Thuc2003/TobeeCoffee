package com.example.backend.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class SizeRequest {
    private BigDecimal priceModifier;
    private List<TranslationRequest> translations;
}