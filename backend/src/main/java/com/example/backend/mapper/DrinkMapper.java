package com.example.backend.mapper;

import com.example.backend.dto.request.DrinkRequest;
import com.example.backend.dto.response.CategoryResponse;
import com.example.backend.dto.response.DrinkResponse;
import com.example.backend.dto.response.DrinkTranslationResponse;
import com.example.backend.dto.response.TranslationResponse;
import com.example.backend.entity.Category;
import com.example.backend.entity.Drink;
import com.example.backend.entity.DrinkTranslation;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DrinkMapper {
    public Drink toEntity(DrinkRequest request, Category category) {
        Drink drink = new Drink();
        drink.setImageUrl(request.getImageUrl());
        drink.setBasePrice(request.getBasePrice());
        drink.setAvailable(request.getAvailable() != null ? request.getAvailable() : true);
        drink.setCategory(category);

        List<DrinkTranslation> translations = request.getTranslations().stream()
                .map(t -> {
                    DrinkTranslation dt = new DrinkTranslation();
                    dt.setDrink(drink); // liên kết ngược
                    dt.setLanguageCode(t.getLanguageCode());
                    dt.setName(t.getName());
                    dt.setDescription(t.getDescription());
                    return dt;
                }).collect(Collectors.toList());

        drink.setTranslations(translations);
        return drink;
    }

    public DrinkResponse toResponse(Drink drink) {
        DrinkResponse response = new DrinkResponse();
        response.setId(drink.getId());
        response.setImageUrl(drink.getImageUrl());
        response.setBasePrice(drink.getBasePrice());
        response.setAvailable(drink.getAvailable());
        response.setCreateAt(drink.getCreateAt());

        List<DrinkTranslationResponse> trs = drink.getTranslations().stream()
                .map(t -> {
                    DrinkTranslationResponse tr = new DrinkTranslationResponse();
                    tr.setLanguageCode(t.getLanguageCode());
                    tr.setName(t.getName());
                    tr.setDescription(t.getDescription());
                    return tr;
                }).collect(Collectors.toList());

        response.setTranslations(trs);

        Category category = drink.getCategory();
        if (category != null) {
            CategoryResponse cr = new CategoryResponse();
            cr.setId(category.getId());
            List<TranslationResponse> ctTranslations = category.getTranslations().stream()
                    .map(ct -> {
                        TranslationResponse tr = new TranslationResponse();
                        tr.setLanguageCode(ct.getLanguageCode());
                        tr.setName(ct.getName());
                        return tr;
                    }).collect(Collectors.toList());
            cr.setTranslations(ctTranslations);
            response.setCategory(cr);
        }

        return response;
    }
}
