package com.example.backend.service.user;

import com.example.backend.dto.response.DrinkResponse;
import com.example.backend.entity.Category;
import com.example.backend.entity.Drink;
import com.example.backend.enums.exception.ErrorCode;
import com.example.backend.exception.ApiException;
import com.example.backend.mapper.DrinkMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.DrinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrinkUserService {

    @Autowired
    private DrinkRepository drinkRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DrinkMapper drinkMapper;

    // Lấy tất cả sản phẩm có available = true
    public List<DrinkResponse> getAllAvailableDrinks() {
        return drinkRepository.findByAvailable(true).stream()
                .map(drinkMapper::toResponse)
                .toList();
    }

    // Lấy sản phẩm theo danh mục, only available = true
    public List<DrinkResponse> getDrinksByCategory(Integer categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ApiException(ErrorCode.CATEGORY_NOT_FOUND));

        return drinkRepository.findByCategoryAndAvailable(category, true).stream()
                .map(drinkMapper::toResponse)
                .toList();
    }

    // Lấy chi tiết sản phẩm theo id, và chỉ khi sản phẩm available
    public DrinkResponse getDrinkById(Integer id) {
        Drink drink = drinkRepository.findById(id)
                .filter(Drink::getAvailable)
                .orElseThrow(() -> new ApiException(ErrorCode.DRINK_NOT_FOUND));
        return drinkMapper.toResponse(drink);
    }

}
