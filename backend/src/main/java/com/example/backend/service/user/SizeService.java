package com.example.backend.service.user;

import com.example.backend.dto.response.SizeResponse;
import com.example.backend.entity.Size;
import com.example.backend.enums.exception.ErrorCode;
import com.example.backend.exception.ApiException;
import com.example.backend.mapper.SizeMapper;
import com.example.backend.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SizeService {

    private final SizeRepository sizeRepository;
    private final SizeMapper sizeMapper;

    public List<SizeResponse> getAllSizes() {
        return sizeRepository.findAll().stream()
                .map(sizeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public SizeResponse getSizeById(Integer id) {
        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.SIZE_NOT_FOUND));
        return sizeMapper.toResponse(size);
    }
}
