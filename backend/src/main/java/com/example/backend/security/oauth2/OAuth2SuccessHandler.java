package com.example.backend.security.oauth2;

import com.example.backend.entity.User;
import com.example.backend.enums.Role;
import com.example.backend.enums.Status;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler{
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .name(name)
                    .password("") // không cần mật khẩu cho social login
                    .status(Status.ACTIVE)
                    .role(Role.USER)
                    .build();
            return userRepository.save(newUser);
        });

        // TODO: generate JWT token if needed
        String jwtToken = jwtUtils.generateToken(user);
        // Redirect về FE kèm JWT token
        String redirectUrl = "http://localhost:5173/oauth-success?token=" + jwtToken;
        response.sendRedirect(redirectUrl);

//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        String json = new ObjectMapper().writeValueAsString(Map.of("token", jwtToken));
//        response.getWriter().write(json);
        //response.sendRedirect("http://localhost:3000/oauth-success"); // redirect về FE
    }
}
