package com.example.backend.entity;

import com.example.backend.enums.DiscountType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Entity
@Table(name = "vouchers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;

    @Enumerated(EnumType.STRING)
    private DiscountType discountType;
    private Integer discountValue;

    private Integer totalQuantity;
    private Integer usedQuantity = 0;
    private LocalDateTime expiresAt;
    private Boolean active = true;

    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
    private List<VoucherTranslation> translations;
}
