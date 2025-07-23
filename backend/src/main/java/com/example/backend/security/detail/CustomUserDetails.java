package com.example.backend.security.detail;

import com.example.backend.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
@Getter
public class CustomUserDetails implements UserDetails {
    private final Integer id;
    private final String email;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(User user, Collection<? extends GrantedAuthority> authorities) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.authorities = authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // hoặc thêm logic riêng nếu cần
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // hoặc thêm logic riêng nếu cần
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // hoặc thêm logic riêng nếu cần
    }

    @Override
    public boolean isEnabled() {
        return true; // hoặc thêm logic riêng nếu cần
    }
}
