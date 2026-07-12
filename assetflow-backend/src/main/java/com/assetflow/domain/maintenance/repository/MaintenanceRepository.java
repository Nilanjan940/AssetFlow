package com.assetflow.domain.maintenance.repository;

import com.assetflow.domain.maintenance.entity.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MaintenanceRepository extends JpaRepository<MaintenanceRequest, UUID> {
    
    List<MaintenanceRequest> findByAssetId(UUID assetId);
    
    List<MaintenanceRequest> findByRequestedBy(UUID requestedBy);
    
    List<MaintenanceRequest> findByStatus(MaintenanceRequest.RequestStatus status);
    
    List<MaintenanceRequest> findByPriority(MaintenanceRequest.Priority priority);
    
    List<MaintenanceRequest> findByTechnicianAssigned(UUID technicianId);
}