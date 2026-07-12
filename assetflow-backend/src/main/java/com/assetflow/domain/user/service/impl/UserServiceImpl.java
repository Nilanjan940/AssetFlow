package com.assetflow.domain.user.service.impl;

import com.assetflow.domain.user.dto.request.LoginRequest;
import com.assetflow.domain.user.dto.request.RegisterRequest;
import com.assetflow.domain.user.dto.response.AuthResponse;
import com.assetflow.domain.user.dto.response.UserResponse;
import com.assetflow.domain.user.entity.User;
import com.assetflow.domain.user.repository.UserRepository;
import com.assetflow.domain.user.service.UserService;
import com.assetflow.infrastructure.exception.UnauthorizedException;
import com.assetflow.infrastructure.exception.ValidationException;
import com.assetflow.infrastructure.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    
    @Override
    public AuthResponse login(LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());
        
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        String accessToken = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);
        
        log.info("Login successful for user: {}", user.getEmail());
        
        return AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .user(mapToUserResponse(user))
            .build();
    }
    
    @Override
    public UserResponse register(RegisterRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ValidationException("Email already registered");
        }
        
        User user = User.builder()
            .email(request.getEmail())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .departmentId(request.getDepartmentId())
            .role(User.Role.EMPLOYEE)
            .employeeId(generateEmployeeId())
            .isActive(true)
            .build();
        
        User savedUser = userRepository.save(user);
        log.info("User registered successfully with ID: {}", savedUser.getId());
        
        return mapToUserResponse(savedUser);
    }
    
    @Override
    public AuthResponse refreshToken(String refreshToken) {
        String email = jwtTokenProvider.extractUsername(refreshToken);
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));
        
        if (jwtTokenProvider.isTokenExpired(refreshToken)) {
            throw new UnauthorizedException("Refresh token expired");
        }
        
        String accessToken = jwtTokenProvider.generateToken(user);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user);
        
        return AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(newRefreshToken)
            .user(mapToUserResponse(user))
            .build();
    }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
    
    private String generateEmployeeId() {
        long count = userRepository.count() + 1;
        return String.format("EMP-%d-%03d", LocalDateTime.now().getYear(), count);
    }
    
    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .employeeId(user.getEmployeeId())
            .role(user.getRole())
            .departmentId(user.getDepartmentId())
            .phone(user.getPhone())
            .position(user.getPosition())
            .isActive(user.isActive())
            .lastLogin(user.getLastLogin())
            .createdAt(user.getCreatedAt())
            .build();
    }
}