package com.example.backend.controller.user;

import com.example.backend.dto.response.ToppingResponse;
import com.example.backend.service.user.ToppingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/toppings")
@RequiredArgsConstructor
public class ToppingController {

    private final ToppingService toppingService;

    @GetMapping
    public ResponseEntity<List<ToppingResponse>> getAllToppings() {
        return ResponseEntity.ok(toppingService.getAllToppings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToppingResponse> getToppingById(@PathVariable Integer id) {
        return ResponseEntity.ok(toppingService.getToppingById(id));
    }
}
