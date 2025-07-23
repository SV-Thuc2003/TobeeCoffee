package com.example.backend.service.admin;

import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.User;
import com.example.backend.enums.Status;
import com.example.backend.enums.exception.ErrorCode;
import com.example.backend.exception.ApiException;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    @Autowired
    UserRepository userRepository;

    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findByStatusNot(Status.DELETE, pageable)
                .map(UserResponse::fromEntity);

    }
    public Page<UserResponse> getUsersByStatus(Status status, Pageable pageable) {
        return userRepository.findByStatus(status, pageable)
                .map(UserResponse::fromEntity);
    }

    public String toggleUserStatus(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

        if (user.getStatus() == Status.ACTIVE) {
            user.setStatus(Status.INACTIVE);
        } else {
            user.setStatus(Status.ACTIVE);
        }

        userRepository.save(user);
        return "Trạng thái người dùng được cập nhật.";
    }
// xóa vính viễn

    /**
     * public String deleteUser(Integer userId) {
     *         User user = userRepository.findById(userId)
     *                 .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
     *         userRepository.delete(user);
     *         return "Người dùng đã được xóa";
     *     }
     */

//    đổi status cho db là delete
    public String deleteUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

        user.setStatus(Status.DELETE);
        userRepository.save(user);
        return "Người dùng đã được đánh dấu là xóa.";
    }

    // Khoi phuc nguoi bi xoa mem
    public String restoreUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

        if (user.getStatus() == Status.DELETE) {
            user.setStatus(Status.INACTIVE);
            userRepository.save(user);
            return "Người dùng đã được khôi phục";
        }

        return "Người dùng không ở trạng thái bị xóa";
    }
}
