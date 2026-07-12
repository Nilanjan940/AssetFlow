package com.assetflow.domain.department.service;

import com.assetflow.domain.department.dto.request.CreateDepartmentRequest;
import com.assetflow.domain.department.dto.request.UpdateDepartmentRequest;
import com.assetflow.domain.department.dto.response.DepartmentResponse;
import com.assetflow.domain.department.entity.Department;

import java.util.List;
import java.util.UUID;

public interface DepartmentService {
    
    DepartmentResponse createDepartment(CreateDepartmentRequest request);
    
    DepartmentResponse getDepartmentById(UUID id);
    
    DepartmentResponse getDepartmentByName(String name);
    
    List<DepartmentResponse> getAllDepartments();
    
    List<DepartmentResponse> getActiveDepartments();
    
    DepartmentResponse updateDepartment(UUID id, UpdateDepartmentRequest request);
    
    void deleteDepartment(UUID id);
    
    void activateDepartment(UUID id);
    
    void deactivateDepartment(UUID id);
    
    Department getEntityById(UUID id);
}