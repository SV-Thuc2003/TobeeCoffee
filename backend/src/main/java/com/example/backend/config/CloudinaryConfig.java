package com.example.backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "djrbumvez",
                "api_key", "663877861623893",
                "api_secret", "Gxz2ZGsu1yhPzxtD6FcLfiQ74dc",
                "secure", true
        ));
    }
}
