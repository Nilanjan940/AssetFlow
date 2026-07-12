package com.assetflow.domain.user.service;

import com.assetflow.domain.user.dto.request.LoginRequest;
import com.assetflow.domain.user.dto.request.RegisterRequest;
import com.assetflow.domain.user.dto.response.AuthResponse;
import com.assetflow.domain.user.dto.response.UserResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    
    AuthResponse login(LoginRequest request);
    
    UserResponse register(RegisterRequest request);
    
    AuthResponse refreshToken(String refreshToken);
}