package com.assetflow.domain.maintenance.dto.response;

import com.assetflow.domain.maintenance.entity.MaintenanceRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceResponse {
    private UUID id;
    private UUID assetId;
    private String issue;
    private MaintenanceRequest.Priority priority;
    private MaintenanceRequest.RequestStatus status;
    private UUID requestedBy;
    private UUID approvedBy;
    private LocalDateTime approvedAt;
    private UUID rejectedBy;
    private LocalDateTime rejectedAt;
    private UUID technicianAssigned;
    private LocalDateTime assignedAt;
    private LocalDateTime resolvedAt;
    private String resolutionNotes;
    private String photoUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}