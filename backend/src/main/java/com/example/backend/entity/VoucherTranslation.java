package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "voucher_translations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoucherTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String languageCode;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;
}
