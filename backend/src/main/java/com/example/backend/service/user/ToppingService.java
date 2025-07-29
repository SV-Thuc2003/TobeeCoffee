package com.example.backend.service.user;

import com.example.backend.dto.response.ToppingResponse;
import com.example.backend.entity.Topping;
import com.example.backend.enums.exception.ErrorCode;
import com.example.backend.exception.ApiException;
import com.example.backend.mapper.ToppingMapper;
import com.example.backend.repository.ToppingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ToppingService {

    private final ToppingRepository toppingRepository;
    private final ToppingMapper toppingMapper;

    public List<ToppingResponse> getAllToppings() {
        return toppingRepository.findAll().stream()
                .map(toppingMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ToppingResponse getToppingById(Integer id) {
        Topping topping = toppingRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.TOPPING_NOT_FOUND));
        return toppingMapper.toResponse(topping);
    }
}
