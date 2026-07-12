package com.assetflow.domain.department.service.impl;

import com.assetflow.domain.department.dto.request.CreateDepartmentRequest;
import com.assetflow.domain.department.dto.request.UpdateDepartmentRequest;
import com.assetflow.domain.department.dto.response.DepartmentResponse;
import com.assetflow.domain.department.entity.Department;
import com.assetflow.domain.department.repository.DepartmentRepository;
import com.assetflow.domain.department.service.DepartmentService;
import com.assetflow.infrastructure.exception.ResourceNotFoundException;
import com.assetflow.infrastructure.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DepartmentServiceImpl implements DepartmentService {
    
    private final DepartmentRepository departmentRepository;
    
    @Override
    public DepartmentResponse createDepartment(CreateDepartmentRequest request) {
        log.info("Creating new department: {}", request.getName());
        
        if (departmentRepository.findByName(request.getName()).isPresent()) {
            throw new ValidationException("Department with name '" + request.getName() + "' already exists");
        }
        
        if (request.getCode() != null && departmentRepository.findByCode(request.getCode()).isPresent()) {
            throw new ValidationException("Department with code '" + request.getCode() + "' already exists");
        }
        
        Department department = Department.builder()
            .name(request.getName())
            .code(request.getCode())
            .description(request.getDescription())
            .parentDepartmentId(request.getParentDepartmentId())
            .departmentHeadId(request.getDepartmentHeadId())
            .status(Department.DepartmentStatus.ACTIVE)
            .build();
        
        Department savedDepartment = departmentRepository.save(department);
        log.info("Department created successfully: {}", savedDepartment.getName());
        
        return mapToDepartmentResponse(savedDepartment);
    }
    
    @Override
    @Transactional(readOnly = true)
    public DepartmentResponse getDepartmentById(UUID id) {
        Department department = departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        return mapToDepartmentResponse(department);
    }
    
    @Override
    @Transactional(readOnly = true)
    public DepartmentResponse getDepartmentByName(String name) {
        Department department = departmentRepository.findByName(name)
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with name: " + name));
        return mapToDepartmentResponse(department);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findAll().stream()
            .map(this::mapToDepartmentResponse)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponse> getActiveDepartments() {
        return departmentRepository.findByStatus(Department.DepartmentStatus.ACTIVE).stream()
            .map(this::mapToDepartmentResponse)
            .collect(Collectors.toList());
    }
    
    @Override
    public DepartmentResponse updateDepartment(UUID id, UpdateDepartmentRequest request) {
        Department department = departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        
        if (request.getName() != null && !request.getName().equals(department.getName())) {
            if (departmentRepository.findByName(request.getName()).isPresent()) {
                throw new ValidationException("Department with name '" + request.getName() + "' already exists");
            }
            department.setName(request.getName());
        }
        
        if (request.getCode() != null && !request.getCode().equals(department.getCode())) {
            if (departmentRepository.findByCode(request.getCode()).isPresent()) {
                throw new ValidationException("Department with code '" + request.getCode() + "' already exists");
            }
            department.setCode(request.getCode());
        }
        
        if (request.getDescription() != null) {
            department.setDescription(request.getDescription());
        }
        if (request.getParentDepartmentId() != null) {
            department.setParentDepartmentId(request.getParentDepartmentId());
        }
        if (request.getDepartmentHeadId() != null) {
            department.setDepartmentHeadId(request.getDepartmentHeadId());
        }
        
        Department updatedDepartment = departmentRepository.save(department);
        log.info("Department updated successfully: {}", updatedDepartment.getId());
        
        return mapToDepartmentResponse(updatedDepartment);
    }
    
    @Override
    public void deleteDepartment(UUID id) {
        Department department = departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        department.setStatus(Department.DepartmentStatus.INACTIVE);
        departmentRepository.save(department);
        log.info("Department deactivated: {}", id);
    }
    
    @Override
    public void activateDepartment(UUID id) {
        Department department = departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        department.setStatus(Department.DepartmentStatus.ACTIVE);
        departmentRepository.save(department);
        log.info("Department activated: {}", id);
    }
    
    @Override
    public void deactivateDepartment(UUID id) {
        Department department = departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        department.setStatus(Department.DepartmentStatus.INACTIVE);
        departmentRepository.save(department);
        log.info("Department deactivated: {}", id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Department getEntityById(UUID id) {
        return departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
    }
    
    private DepartmentResponse mapToDepartmentResponse(Department department) {
        return DepartmentResponse.builder()
            .id(department.getId())
            .name(department.getName())
            .code(department.getCode())
            .description(department.getDescription())
            .parentDepartmentId(department.getParentDepartmentId())
            .departmentHeadId(department.getDepartmentHeadId())
            .status(department.getStatus())
            .createdAt(department.getCreatedAt())
            .updatedAt(department.getUpdatedAt())
            .build();
    }
}