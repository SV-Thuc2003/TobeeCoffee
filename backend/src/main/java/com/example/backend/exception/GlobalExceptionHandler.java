package com.example.backend.exception;

import com.example.backend.enums.exception.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> handleApiException(ApiException ex){
        ErrorCode errorCode = ex.getErrorCode();
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", errorCode.getStatus().value());
        body.put("error", errorCode.getStatus().getReasonPhrase());
        body.put("code", errorCode.name());
        body.put("message", errorCode.getMessage());
        return ResponseEntity.status(errorCode.getStatus()).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnexpected(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(500).body(Map.of(
                "timestamp", LocalDateTime.now(),
                "status", 500,
                "message", "Lỗi hệ thống"
        ));
    }
}
