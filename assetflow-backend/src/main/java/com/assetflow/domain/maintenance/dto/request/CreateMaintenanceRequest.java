package com.assetflow.domain.maintenance.dto.request;

import com.assetflow.domain.maintenance.entity.MaintenanceRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateMaintenanceRequest {
    
    @NotNull(message = "Asset ID is required")
    private UUID assetId;
    
    @NotBlank(message = "Issue description is required")
    private String issue;
    
    private MaintenanceRequest.Priority priority = MaintenanceRequest.Priority.MEDIUM;
    
    private String photoUrl;
}