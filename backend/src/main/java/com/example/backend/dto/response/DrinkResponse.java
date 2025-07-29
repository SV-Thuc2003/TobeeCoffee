package com.example.backend.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class DrinkResponse {
    private Integer id;
    private String imageUrl;
    private BigDecimal basePrice;
    private Boolean available;
    private LocalDateTime createAt;
    private CategoryResponse category;
    private List<DrinkTranslationResponse> translations;
}