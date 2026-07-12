package com.assetflow.domain.department.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateDepartmentRequest {
    
    @NotBlank(message = "Department name is required")
    private String name;
    
    private String code;
    
    private String description;
    
    private UUID parentDepartmentId;
    
    private UUID departmentHeadId;
}