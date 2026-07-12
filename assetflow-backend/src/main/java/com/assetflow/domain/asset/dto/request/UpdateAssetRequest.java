package com.assetflow.domain.asset.dto.request;

import com.assetflow.domain.asset.entity.Asset;
import lombok.Data;

import java.util.UUID;

@Data
public class UpdateAssetRequest {
    
    private String name;
    
    private String description;
    
    private UUID categoryId;
    
    private String serialNumber;
    
    private Asset.AssetCondition condition;
    
    private String location;
}