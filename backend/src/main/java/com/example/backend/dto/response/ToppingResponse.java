package com.example.backend.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ToppingResponse {
    private Integer id;
    private BigDecimal price;
    private List<TranslationResponse> translations;
}