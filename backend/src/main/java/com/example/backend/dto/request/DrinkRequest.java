package com.example.backend.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class DrinkRequest {
    private String imageUrl;
    private BigDecimal basePrice;
    private Boolean available;
    private Integer categoryId;
    private List<DrinkTranslationRequest> translations;
}

