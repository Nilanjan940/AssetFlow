package com.assetflow.domain.user.repository;

import com.assetflow.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByDepartmentId(UUID departmentId);
    
    List<User> findByRoleAndIsActiveTrue(User.Role role);
    
    Optional<User> findByEmployeeId(String employeeId);
}