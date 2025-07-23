package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "sizes")
@Data
public class Size {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
//    private String name;

    @Column(name = "price_modifier")
    private BigDecimal priceModifier;
    @OneToMany(mappedBy = "size", cascade = CascadeType.ALL)
    private List<SizeTranslation> translations;
}
