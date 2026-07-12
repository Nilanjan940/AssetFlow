package com.assetflow.domain.department.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(unique = true, nullable = false, length = 255)
    private String name;
    
    @Column(unique = true, length = 50)
    private String code;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "parent_department_id")
    private UUID parentDepartmentId;
    
    @Column(name = "department_head_id")
    private UUID departmentHeadId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DepartmentStatus status = DepartmentStatus.ACTIVE;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum DepartmentStatus {
        ACTIVE,
        INACTIVE
    }
}