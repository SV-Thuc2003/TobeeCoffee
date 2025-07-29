package com.example.backend.controller.admin;

import com.example.backend.dto.request.DrinkRequest;
import com.example.backend.dto.response.DrinkResponse;
import com.example.backend.service.admin.DrinkService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/admin/drinks")
@PreAuthorize("hasRole('ADMIN')")
public class DrinkAdminController {

    private final DrinkService drinkService;

    public DrinkAdminController(DrinkService drinkService) {
        this.drinkService = drinkService;
    }

    @PostMapping
    public ResponseEntity<DrinkResponse> create(@RequestBody DrinkRequest request) {
        return ResponseEntity.ok(drinkService.createDrink(request));
    }

    @GetMapping
    public ResponseEntity<List<DrinkResponse>> getAll() {
        return ResponseEntity.ok(drinkService.getAllDrinks());
    }
    @GetMapping("/filter")
    public ResponseEntity<List<DrinkResponse>> getDrinksByAvailable(@RequestParam Boolean available) {
        return ResponseEntity.ok(drinkService.getDrinksByAvailable(available));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DrinkResponse> getOne(@PathVariable Integer id) {
        return ResponseEntity.ok(drinkService.getDrinkById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DrinkResponse> update(@PathVariable Integer id, @RequestBody DrinkRequest request) {
        return ResponseEntity.ok(drinkService.updateDrink(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        drinkService.deleteDrink(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/restore")
    public ResponseEntity<DrinkResponse> restoreDrink(@PathVariable Integer id) {
        DrinkResponse restoredDrink = drinkService.restoreDrink(id);
        return ResponseEntity.ok(restoredDrink);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(drinkService.uploadImage(file));
//        String url = drinkService.uploadImage(file);
//        return ResponseEntity.ok(url);
    }
}
