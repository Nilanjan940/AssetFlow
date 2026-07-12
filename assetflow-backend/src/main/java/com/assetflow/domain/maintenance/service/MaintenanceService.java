package com.assetflow.domain.maintenance.service;

import com.assetflow.domain.maintenance.dto.request.CreateMaintenanceRequest;
import com.assetflow.domain.maintenance.dto.request.UpdateMaintenanceRequest;
import com.assetflow.domain.maintenance.dto.response.MaintenanceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface MaintenanceService {
    
    MaintenanceResponse createRequest(CreateMaintenanceRequest request, UUID userId);
    
    MaintenanceResponse getRequestById(UUID id);
    
    Page<MaintenanceResponse> getAllRequests(Pageable pageable, String status, String priority);
    
    MaintenanceResponse approveRequest(UUID id, UUID approverId);
    
    MaintenanceResponse rejectRequest(UUID id, UUID rejectorId, String reason);
    
    MaintenanceResponse assignTechnician(UUID id, UUID technicianId);
    
    MaintenanceResponse resolveRequest(UUID id, String resolutionNotes);
    
    void deleteRequest(UUID id);
}