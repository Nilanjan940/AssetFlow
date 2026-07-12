package com.assetflow.domain.maintenance.dto.request;

import com.assetflow.domain.maintenance.entity.MaintenanceRequest;
import lombok.Data;

@Data
public class UpdateMaintenanceRequest {
    
    private String issue;
    
    private MaintenanceRequest.Priority priority;
}