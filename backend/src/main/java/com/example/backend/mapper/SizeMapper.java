package com.example.backend.mapper;

import com.example.backend.dto.request.SizeRequest;
import com.example.backend.dto.response.SizeResponse;
import com.example.backend.dto.response.TranslationResponse;
import com.example.backend.entity.Size;
import com.example.backend.entity.SizeTranslation;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SizeMapper {
    public Size toEntity(SizeRequest request) {
        Size size = new Size();
        size.setPriceModifier(request.getPriceModifier());

        List<SizeTranslation> translations = request.getTranslations().stream()
                .map(tr -> {
                    SizeTranslation st = new SizeTranslation();
                    st.setSize(size); // set quan hệ ngược
                    st.setLanguageCode(tr.getLanguageCode());
                    st.setName(tr.getName());
                    return st;
                }).collect(Collectors.toList());

        size.setTranslations(translations);
        return size;
    }

    public SizeResponse toResponse(Size size) {
        SizeResponse res = new SizeResponse();
        res.setId(size.getId());
        res.setPriceModifier(size.getPriceModifier());

        List<TranslationResponse> translations = size.getTranslations().stream()
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
