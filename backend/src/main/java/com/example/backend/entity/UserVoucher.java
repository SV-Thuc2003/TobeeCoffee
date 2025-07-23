package com.example.backend.entity;

import com.example.backend.enums.VoucherStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_voucher")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    private String code;

    @Enumerated(EnumType.STRING)
    private VoucherStatus status;

    private LocalDateTime issuedDate;
    private LocalDateTime expireDate;
}

