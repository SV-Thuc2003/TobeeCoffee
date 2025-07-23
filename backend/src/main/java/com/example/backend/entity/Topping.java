package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "toppings")
@Data
public class Topping {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
//    private String name;
    private BigDecimal price;
    @OneToMany(mappedBy = "topping", cascade = CascadeType.ALL)
    private List<ToppingTranslation> translations;
}
