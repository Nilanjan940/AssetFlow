package com.assetflow.domain.asset.dto.response;

import com.assetflow.domain.asset.entity.Asset;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssetResponse {
    private UUID id;
    private String assetTag;
    private String name;
    private String description;
    private UUID categoryId;
    private String serialNumber;
    private LocalDate acquisitionDate;
    private BigDecimal acquisitionCost;
    private Asset.AssetCondition condition;
    private String location;
    private Asset.AssetStatus currentStatus;
    private boolean isSharedBookable;
    private UUID currentHolderId;
    private UUID currentDepartmentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}