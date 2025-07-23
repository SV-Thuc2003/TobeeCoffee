package com.example.backend.controller;

import com.example.backend.dto.response.VoucherResponse;
import com.example.backend.entity.UserVoucher;
import com.example.backend.security.detail.CustomUserDetails;
import com.example.backend.service.user.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/voucher")
@RequiredArgsConstructor
public class VoucherUserController {

    private final VoucherService voucherService;

    @PostMapping("/spin")
    public ResponseEntity<?> spin(
            @RequestHeader(name = "Accept-Language", required = false) Locale locale,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Integer userId = userDetails != null ? userDetails.getId() : null;
        VoucherResponse response = voucherService.spinVoucher(userId, locale);
        if (response == null) {
            // Ví dụ không trúng voucher, trả về 204 No Content hoặc message phù hợp
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-vouchers")
    public ResponseEntity<List<UserVoucher>> getUserVouchers(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        if (userDetails == null) {
            // Nếu chưa đăng nhập thì trả về 401 Unauthorized
            return ResponseEntity.status(401).build();
        }
        List<UserVoucher> vouchers = voucherService.getUserVouchers(userDetails.getId());
        return ResponseEntity.ok(vouchers);
    }
}
