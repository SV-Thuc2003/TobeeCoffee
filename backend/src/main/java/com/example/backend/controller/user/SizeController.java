package com.example.backend.controller.user;

import com.example.backend.dto.response.SizeResponse;
import com.example.backend.service.user.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/sizes")
@RequiredArgsConstructor
public class SizeController {

    private final SizeService sizeService;

    @GetMapping
    public ResponseEntity<List<SizeResponse>> getAllSizes() {
        return ResponseEntity.ok(sizeService.getAllSizes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SizeResponse> getSizeById(@PathVariable Integer id) {
        return ResponseEntity.ok(sizeService.getSizeById(id));
    }
}
