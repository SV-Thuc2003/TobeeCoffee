package com.example.backend.enums.exception;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Tài khoản đã tồn tại"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "Tài khoản không tồn tại"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "Mật khẩu không đúng"),
    OAUTH2_LOGIN_FAILED(HttpStatus.UNAUTHORIZED, "Đăng nhập OAuth2 thất bại"),
    VOUCHER_NOT_FOUND(HttpStatus.NOT_FOUND, "Voucher không tồn tại"),
    SPIN_LIMIT_REACHED(HttpStatus.BAD_REQUEST, "Bạn chỉ được quay mỗi 7 ngày 1 lần"),
    DRINK_NOT_FOUND(HttpStatus.NOT_FOUND, "Đồ uống không tồn tại"),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Danh mục không tồn tại"),
    IMAGE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi upload ảnh"),
    SIZE_NOT_FOUND(HttpStatus.NOT_FOUND, "Kích cỡ không tồn tại"),
    TOPPING_NOT_FOUND(HttpStatus.NOT_FOUND, "Topping không tồn tại"),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi hệ thống");

    private final HttpStatus status;
    private final String message;
}