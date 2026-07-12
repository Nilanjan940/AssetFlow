package com.assetflow.domain.asset.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "asset_tag", unique = true, nullable = false, length = 50)
    private String assetTag;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "category_id")
    private UUID categoryId;
    
    @Column(name = "serial_number", unique = true, length = 100)
    private String serialNumber;
    
    @Column(name = "acquisition_date")
    private LocalDate acquisitionDate;
    
    @Column(name = "acquisition_cost", precision = 15, scale = 2)
    private BigDecimal acquisitionCost;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetCondition condition = AssetCondition.GOOD;
    
    @Column(length = 255)
    private String location;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "current_status", nullable = false)
    private AssetStatus currentStatus = AssetStatus.AVAILABLE;
    
    @Column(name = "is_shared_bookable")
    private boolean isSharedBookable = false;
    
    @Column(name = "current_holder_id")
    private UUID currentHolderId;
    
    @Column(name = "current_department_id")
    private UUID currentDepartmentId;
    
    @Column(name = "created_by")
    private UUID createdBy;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum AssetStatus {
        AVAILABLE,
        ALLOCATED,
        RESERVED,
        UNDER_MAINTENANCE,
        LOST,
        RETIRED,
        DISPOSED
    }
    
    public enum AssetCondition {
        EXCELLENT,
        GOOD,
        FAIR,
        POOR,
        DAMAGED
    }
}