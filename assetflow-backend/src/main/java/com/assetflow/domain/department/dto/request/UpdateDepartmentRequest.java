package com.assetflow.domain.department.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateDepartmentRequest {
    
    private String name;
    
    private String code;
    
    private String description;
    
    private UUID parentDepartmentId;
    
    private UUID departmentHeadId;
}