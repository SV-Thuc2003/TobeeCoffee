package com.example.backend.repository;

import com.example.backend.entity.UserSpinLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserSpinLogRepository extends JpaRepository<UserSpinLog, Integer> {
    Optional<UserSpinLog> findTopByUserIdOrderBySpinDateDesc(Integer userId);
}
