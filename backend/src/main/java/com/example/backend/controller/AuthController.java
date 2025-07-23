package com.example.backend.controller;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.RegisterRequest;
import com.example.backend.dto.response.AuthResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.user.AuthService;
import com.example.backend.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthService authService;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/register")
    public Map<String, String> register (@RequestBody RegisterRequest request) {
        String message = authService.register(request);
        return Map.of("message", message);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        authService.login(request);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String jwt = jwtUtils.generateToken(user);
        UserResponse userResponse = UserResponse.fromEntity(user);

        return new AuthResponse(jwt, userResponse);
    }

    @PostMapping("/logout")
    public Map<String, String> logout() {
        // Nếu không dùng refresh token -> chỉ cần client xóa token là đủ
        return Map.of("message", "Đã đăng xuất (Client tự xóa token)");
    }
}
