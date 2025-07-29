package com.example.backend.repository;

import com.example.backend.entity.Category;
import com.example.backend.entity.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrinkRepository extends JpaRepository<Drink, Integer> {
    List<Drink> findByAvailable(Boolean available);
    List<Drink> findByCategoryAndAvailable(Category category, Boolean available);

}
