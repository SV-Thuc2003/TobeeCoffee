package com.example.backend.service.admin;

import com.example.backend.dto.request.DrinkRequest;
import com.example.backend.dto.response.DrinkResponse;
import com.example.backend.entity.Category;
import com.example.backend.entity.Drink;
import com.example.backend.entity.DrinkTranslation;
import com.example.backend.enums.exception.ErrorCode;
import com.example.backend.exception.ApiException;
import com.example.backend.mapper.DrinkMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.DrinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class DrinkService {
    @Autowired
    DrinkRepository drinkRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    DrinkMapper drinkMapper;
    @Autowired
    UploadService uploadService;

    public DrinkService(
            DrinkRepository drinkRepository,
            CategoryRepository categoryRepository,
            DrinkMapper drinkMapper,
            UploadService uploadService
    ) {
        this.drinkRepository = drinkRepository;
        this.categoryRepository = categoryRepository;
        this.drinkMapper = drinkMapper;
        this.uploadService = uploadService;
    }

    public DrinkResponse createDrink(DrinkRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiException(ErrorCode.CATEGORY_NOT_FOUND));

        Drink drink = drinkMapper.toEntity(request, category);
        return drinkMapper.toResponse(drinkRepository.save(drink));
    }

    public List<DrinkResponse> getAllDrinks() {
        return drinkRepository.findAll().stream()
                .map(drinkMapper::toResponse)
                .toList();
    }
    public List<DrinkResponse> getDrinksByAvailable(Boolean available) {
        return drinkRepository.findByAvailable(available).stream()
                .map(drinkMapper::toResponse)
                .toList();
    }

    public DrinkResponse getDrinkById(Integer id) {
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.DRINK_NOT_FOUND));
        return drinkMapper.toResponse(drink);
    }

    public DrinkResponse updateDrink(Integer id, DrinkRequest request) {
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.DRINK_NOT_FOUND));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiException(ErrorCode.CATEGORY_NOT_FOUND));

        drink.setImageUrl(request.getImageUrl());
        drink.setBasePrice(request.getBasePrice());
        drink.setAvailable(request.getAvailable());
        drink.setCategory(category);

        // Lấy danh sách translations mới từ mapper
        List<DrinkTranslation> newTranslations = drinkMapper.toEntity(request, category).getTranslations();

        // Set lại liên kết drink cho từng translation mới
        newTranslations.forEach(t -> t.setDrink(drink));

        // Xóa translations cũ và thêm translations mới
        drink.getTranslations().clear();
        drink.getTranslations().addAll(newTranslations);

        return drinkMapper.toResponse(drinkRepository.save(drink));
    }

// xóa cứng
//    public void deleteDrink(Integer id) {
//        if (!drinkRepository.existsById(id)) {
//            throw new ApiException(ErrorCode.DRINK_NOT_FOUND);
//        }
//        drinkRepository.deleteById(id);
//    }

    public void deleteDrink(Integer id) {
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.DRINK_NOT_FOUND));

        // Đặt available = false để ẩn món
        drink.setAvailable(false);
        drinkRepository.save(drink);
    }
    public DrinkResponse restoreDrink(Integer id) {
        Drink drink = drinkRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.DRINK_NOT_FOUND));
        drink.setAvailable(true); // đặt lại trạng thái là khả dụng
        return drinkMapper.toResponse(drinkRepository.save(drink));
    }


    public String uploadImage(MultipartFile file) {
        return uploadService.uploadFile(file);
    }
}
