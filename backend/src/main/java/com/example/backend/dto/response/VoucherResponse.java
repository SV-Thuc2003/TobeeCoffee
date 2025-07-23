package com.example.backend.dto.response;

import com.example.backend.enums.DiscountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherResponse {
    private String code;
    private String name;
    private String description;
    private DiscountType discountType;
    private Integer discountValue;
    private LocalDateTime issuedDate;
    private LocalDateTime expireDate;
}
