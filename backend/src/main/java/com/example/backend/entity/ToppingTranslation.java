package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "topping_translations")
@Data
public class ToppingTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "topping_id")
    private Topping topping;

    @Column(name = "language_code")
    private String languageCode;

    private String name;
}
