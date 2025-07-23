package com.example.backend.controller.admin;

import com.example.backend.dto.response.UserResponse;
import com.example.backend.enums.Status;
import com.example.backend.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN)")
public class AdminUserController {
    @Autowired
    AdminService adminService;

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(adminService.getAllUsers(pageable));
    }
    @GetMapping("/status")
    public ResponseEntity<Page<UserResponse>> getUsersByStatus(
            @RequestParam Status status,
            Pageable pageable) {
        return ResponseEntity.ok(adminService.getUsersByStatus(status, pageable));
    }

    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<Map<String, String>> toggleUserStatus(@PathVariable Integer id) {
        String message = adminService.toggleUserStatus(id);
        return ResponseEntity.ok(Map.of("message", message));
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteUser(@PathVariable Integer id) {
        String message = adminService.deleteUser(id);
        return Map.of("message", message);
    }

    @PutMapping("/{id}/restore")
    public  ResponseEntity<Map<String, String>> restoreUser(@PathVariable Integer id) {
        String message = adminService.restoreUser(id);
        return ResponseEntity.ok(Map.of("message", message));
    }
}
