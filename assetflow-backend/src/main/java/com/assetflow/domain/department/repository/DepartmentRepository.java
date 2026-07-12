package com.assetflow.domain.department.repository;

import com.assetflow.domain.department.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, UUID> {
    
    Optional<Department> findByName(String name);
    
    Optional<Department> findByCode(String code);
    
    List<Department> findByStatus(Department.DepartmentStatus status);
    
    List<Department> findByParentDepartmentId(UUID parentId);
}