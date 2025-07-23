package com.example.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
@Data
public class RegisterRequest {
    @NotBlank
    private String name;

    @Email
    private String email;

    @NotBlank
    private String password;
}
