package com.assetflow.domain.user.dto.response;

import com.assetflow.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String employeeId;
    private User.Role role;
    private UUID departmentId;
    private String phone;
    private String position;
    private boolean isActive;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
}