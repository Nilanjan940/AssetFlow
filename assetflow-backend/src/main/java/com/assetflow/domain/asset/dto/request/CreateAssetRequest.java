package com.assetflow.domain.asset.dto.request;

import com.assetflow.domain.asset.entity.Asset;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class CreateAssetRequest {
    
    @NotBlank(message = "Asset name is required")
    private String name;
    
    private String description;
    
    @NotNull(message = "Category is required")
    private UUID categoryId;
    
    private String serialNumber;
    
    private LocalDate acquisitionDate;
    
    private BigDecimal acquisitionCost;
    
    private Asset.AssetCondition condition;
    
    private String location;
    
    private boolean isSharedBookable;
}