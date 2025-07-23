package com.example.backend.repository;

import com.example.backend.entity.User;
import com.example.backend.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Page<User> findByStatusNot(Status status, Pageable pageable);
    Page<User> findByStatus(Status status, Pageable pageable);
}
