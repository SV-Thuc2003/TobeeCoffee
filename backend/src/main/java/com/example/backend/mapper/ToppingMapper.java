package com.example.backend.mapper;

import com.example.backend.dto.request.ToppingRequest;
import com.example.backend.dto.response.ToppingResponse;
import com.example.backend.dto.response.TranslationResponse;
import com.example.backend.entity.Topping;
import com.example.backend.entity.ToppingTranslation;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ToppingMapper {
    public Topping toEntity(ToppingRequest request) {
        Topping topping = new Topping();
        topping.setPrice(request.getPrice());

        List<ToppingTranslation> translations = request.getTranslations().stream()
                .map(tr -> {
                    ToppingTranslation tt = new ToppingTranslation();
                    tt.setTopping(topping);
                    tt.setLanguageCode(tr.getLanguageCode());
                    tt.setName(tr.getName());
                    return tt;
                }).collect(Collectors.toList());

        topping.setTranslations(translations);
        return topping;
    }

    public ToppingResponse toResponse(Topping topping) {
        ToppingResponse res = new ToppingResponse();
        res.setId(topping.getId());
        res.setPrice(topping.getPrice());

        List<TranslationResponse> translations = topping.getTranslations().stream()
                .map(tr -> {
                    TranslationResponse trRes = new TranslationResponse();
                    trRes.setLanguageCode(tr.getLanguageCode());
                    trRes.setName(tr.getName());
                    return trRes;
                }).collect(Collectors.toList());

        res.setTranslations(translations);
        return res;
    }
}
