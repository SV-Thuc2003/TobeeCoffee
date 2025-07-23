package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "user_spin_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSpinLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private LocalDateTime spinDate;
}


