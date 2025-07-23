package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "drinks")
@Data
public class Drink {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String imageUrl;

    @Column(name = "base_price")
    private BigDecimal basePrice;
//    private String category;
    private Boolean available = true;

    @Column(name = "create_at")
    private LocalDateTime createAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "drink", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DrinkTranslation> translations = new ArrayList<>();
}
