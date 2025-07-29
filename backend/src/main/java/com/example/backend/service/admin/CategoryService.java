package com.example.backend.service.admin;

import com.example.backend.dto.response.CategoryResponse;
import com.example.backend.dto.response.TranslationResponse;
import com.example.backend.entity.Category;
import com.example.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream().map(category -> {
            CategoryResponse response = new CategoryResponse();
            response.setId(category.getId());

            List<TranslationResponse> translations = category.getTranslations().stream().map(translation -> {
                TranslationResponse tr = new TranslationResponse();
                tr.setLanguageCode(translation.getLanguageCode());
                tr.setName(translation.getName());
                return tr;
            }).collect(Collectors.toList());

            response.setTranslations(translations);
            return response;
        }).collect(Collectors.toList());
    }
}
