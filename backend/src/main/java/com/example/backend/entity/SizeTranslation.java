package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "size_translations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SizeTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size size;

    @Column(name = "language_code")
    private String languageCode;

    private String name;
}

