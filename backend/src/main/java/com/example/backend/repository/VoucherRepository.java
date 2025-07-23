package com.example.backend.repository;

import com.example.backend.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    @Query("SELECT v FROM Voucher v WHERE v.active = true AND v.usedQuantity < v.totalQuantity AND v.expiresAt > CURRENT_TIMESTAMP")
    List<Voucher> findAvailableAndActive();

}
