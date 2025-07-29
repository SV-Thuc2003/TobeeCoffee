package com.example.backend.controller;

import com.example.backend.dto.response.DrinkResponse;
import com.example.backend.service.user.DrinkUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // hoặc domain front-end của user nếu có
@RestController
@RequestMapping("/api/user/drinks")
public class DrinkUserController {

    private final DrinkUserService drinkUserService;

    public DrinkUserController(DrinkUserService drinkUserService) {
        this.drinkUserService = drinkUserService;
    }

    @GetMapping
    public ResponseEntity<List<DrinkResponse>> getAllDrinks() {
        return ResponseEntity.ok(drinkUserService.getAllAvailableDrinks());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<DrinkResponse>> getDrinksByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(drinkUserService.getDrinksByCategory(categoryId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DrinkResponse> getDrinkById(@PathVariable Integer id) {
        return ResponseEntity.ok(drinkUserService.getDrinkById(id));
    }
}
