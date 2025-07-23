package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Một category có thể chứa nhiều bản dịch
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryTranslation> translations = new ArrayList<>();

    // Optional: danh sách các drink trong category
    @OneToMany(mappedBy = "category")
    private List<Drink> drinks = new ArrayList<>();
}
