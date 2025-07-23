package com.example.backend.service.user;

import com.example.backend.dto.response.VoucherResponse;
import com.example.backend.entity.*;
import com.example.backend.enums.VoucherStatus;
import com.example.backend.enums.exception.ErrorCode;
import com.example.backend.exception.ApiException;
import com.example.backend.repository.UserSpinLogRepository;
import com.example.backend.repository.UserVoucherRepository;
import com.example.backend.repository.VoucherRepository;
import io.micrometer.common.lang.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class VoucherService {
    @Autowired
    VoucherRepository voucherRepository;
    @Autowired UserSpinLogRepository userSpinLogRepository;
    @Autowired UserVoucherRepository userVoucherRepository;

    public VoucherResponse spinVoucher(@Nullable Integer userId, Locale locale) {
        boolean isLoggedIn = userId != null;

        if (isLoggedIn) {
            // Kiểm tra cooldown 7 ngày
            Optional<UserSpinLog> lastSpin = userSpinLogRepository
                    .findTopByUserIdOrderBySpinDateDesc(userId);
            if (lastSpin.isPresent() && lastSpin.get().getSpinDate()
                    .isAfter(LocalDateTime.now().minusDays(7))) {
                throw new ApiException(ErrorCode.SPIN_LIMIT_REACHED);
            }

            // Lưu lượt quay
            userSpinLogRepository.save(new UserSpinLog(null, userId, LocalDateTime.now()));
        }

        // Tỷ lệ trúng 50%
        if (Math.random() < 0.5) {
            return null;
        }

        List<Voucher> available = voucherRepository.findAvailableAndActive();
        if (available.isEmpty()) return null;

        Voucher voucher = available.get(new Random().nextInt(available.size()));
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expire = now.plusDays(7);

        if (isLoggedIn) {
            UserVoucher userVoucher = new UserVoucher();
            userVoucher.setUser(new User(userId));
            userVoucher.setVoucher(voucher);
            userVoucher.setCode(voucher.getCode());
            userVoucher.setStatus(VoucherStatus.UNUSED);
            userVoucher.setIssuedDate(now);
            userVoucher.setExpireDate(expire);
            userVoucherRepository.save(userVoucher);
        }

        VoucherTranslation trans = voucher.getTranslations().stream()
                .filter(t -> t.getLanguageCode().equalsIgnoreCase(locale.getLanguage()))
                .findFirst().orElse(null);

        return new VoucherResponse(
                voucher.getCode(),
                trans != null ? trans.getName() : "",
                trans != null ? trans.getDescription() : "",
                voucher.getDiscountType(),
                voucher.getDiscountValue(),
                now,
                expire
        );
    }

    public List<UserVoucher> getUserVouchers(Integer userId) {
        return userVoucherRepository.findByUserId(userId);
    }
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }
    public Voucher createVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }
    public Voucher updateVoucher(Long id, Voucher updatedVoucher) {
        return voucherRepository.findById(id)
                .map(existing -> {
                    updatedVoucher.setId(id);
                    return voucherRepository.save(updatedVoucher);
                })
                .orElseThrow(() -> new ApiException(ErrorCode.VOUCHER_NOT_FOUND));
    }
    public void deleteVoucher(Long id) {
        Voucher v = voucherRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.VOUCHER_NOT_FOUND));
        v.setActive(false);
        voucherRepository.save(v);
    }
}
