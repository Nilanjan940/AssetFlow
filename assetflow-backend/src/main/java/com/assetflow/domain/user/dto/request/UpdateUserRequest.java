package com.assetflow.domain.user.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateUserRequest {
    
    private String firstName;
    
    private String lastName;
    
    private String phone;
    
    private String position;
    
    private UUID departmentId;
}