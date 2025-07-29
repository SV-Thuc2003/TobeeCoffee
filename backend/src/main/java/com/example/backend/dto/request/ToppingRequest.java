package com.example.backend.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ToppingRequest {
    private BigDecimal price;
    private List<TranslationRequest> translations;
}