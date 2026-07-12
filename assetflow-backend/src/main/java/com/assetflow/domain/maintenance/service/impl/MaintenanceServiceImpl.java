package com.assetflow.domain.maintenance.service.impl;

import com.assetflow.domain.maintenance.dto.request.CreateMaintenanceRequest;
import com.assetflow.domain.maintenance.dto.request.UpdateMaintenanceRequest;
import com.assetflow.domain.maintenance.dto.response.MaintenanceResponse;
import com.assetflow.domain.maintenance.entity.MaintenanceRequest;
import com.assetflow.domain.maintenance.repository.MaintenanceRepository;
import com.assetflow.domain.maintenance.service.MaintenanceService;
import com.assetflow.infrastructure.exception.ResourceNotFoundException;
import com.assetflow.infrastructure.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MaintenanceServiceImpl implements MaintenanceService {
    
    private final MaintenanceRepository maintenanceRepository;
    
    @Override
    public MaintenanceResponse createRequest(CreateMaintenanceRequest request, UUID userId) {
        log.info("Creating maintenance request for asset: {}", request.getAssetId());
        
        MaintenanceRequest maintenanceRequest = MaintenanceRequest.builder()
            .assetId(request.getAssetId())
            .issue(request.getIssue())
            .priority(request.getPriority())
            .status(MaintenanceRequest.RequestStatus.PENDING)
            .requestedBy(userId)
            .photoUrl(request.getPhotoUrl())
            .build();
        
        MaintenanceRequest saved = maintenanceRepository.save(maintenanceRequest);
        log.info("Maintenance request created with ID: {}", saved.getId());
        
        return mapToResponse(saved);
    }
    
    @Override
    @Transactional(readOnly = true)
    public MaintenanceResponse getRequestById(UUID id) {
        MaintenanceRequest request = maintenanceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found"));
        return mapToResponse(request);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<MaintenanceResponse> getAllRequests(Pageable pageable, String status, String priority) {
        Page<MaintenanceRequest> requests;
        if (status != null && priority != null) {
            try {
                MaintenanceRequest.RequestStatus statusEnum = MaintenanceRequest.RequestStatus.valueOf(status.toUpperCase());
                MaintenanceRequest.Priority priorityEnum = MaintenanceRequest.Priority.valueOf(priority.toUpperCase());
                // This would need a custom repository method
                requests = maintenanceRepository.findAll(pageable);
            } catch (IllegalArgumentException e) {
                requests = maintenanceRepository.findAll(pageable);
            }
        } else if (status != null) {
            try {
                MaintenanceRequest.RequestStatus statusEnum = MaintenanceRequest.RequestStatus.valueOf(status.toUpperCase());
                requests = (Page<MaintenanceRequest>) maintenanceRepository.findByStatus(statusEnum);
            } catch (IllegalArgumentException e) {
                requests = maintenanceRepository.findAll(pageable);
            }
        } else {
            requests = maintenanceRepository.findAll(pageable);
        }
        return requests.map(this::mapToResponse);
    }
    
    @Override
    public MaintenanceResponse approveRequest(UUID id, UUID approverId) {
        MaintenanceRequest request = maintenanceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found"));
        
        if (request.getStatus() != MaintenanceRequest.RequestStatus.PENDING) {
            throw new ValidationException("Request is not in pending state");
        }
        
        request.setStatus(MaintenanceRequest.RequestStatus.APPROVED);
        request.setApprovedBy(approverId);
        request.setApprovedAt(LocalDateTime.now());
        
        MaintenanceRequest updated = maintenanceRepository.save(request);
        log.info("Maintenance request approved: {}", id);
        
        return mapToResponse(updated);
    }
    
    @Override
    public MaintenanceResponse rejectRequest(UUID id, UUID rejectorId, String reason) {
        MaintenanceRequest request = maintenanceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found"));
        
        if (request.getStatus() != MaintenanceRequest.RequestStatus.PENDING) {
            throw new ValidationException("Request is not in pending state");
        }
        
        request.setStatus(MaintenanceRequest.RequestStatus.REJECTED);
        request.setRejectedBy(rejectorId);
        request.setRejectedAt(LocalDateTime.now());
        request.setResolutionNotes(reason);
        
        MaintenanceRequest updated = maintenanceRepository.save(request);
        log.info("Maintenance request rejected: {}", id);
        
        return mapToResponse(updated);
    }
    
    @Override
    public MaintenanceResponse assignTechnician(UUID id, UUID technicianId) {
        MaintenanceRequest request = maintenanceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found"));
        
        if (request.getStatus() != MaintenanceRequest.RequestStatus.APPROVED) {
            throw new ValidationException("Request must be approved before assigning technician");
        }
        
        request.setStatus(MaintenanceRequest.RequestStatus.IN_PROGRESS);
        request.setTechnicianAssigned(technicianId);
        request.setAssignedAt(LocalDateTime.now());
        
        MaintenanceRequest updated = maintenanceRepository.save(request);
        log.info("Technician assigned to maintenance request: {}", id);
        
        return mapToResponse(updated);
    }
    
    @Override
    public MaintenanceResponse resolveRequest(UUID id, String resolutionNotes) {
        MaintenanceRequest request = maintenanceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Maintenance request not found"));
        
        if (request.getStatus() != MaintenanceRequest.RequestStatus.IN_PROGRESS) {
            throw new ValidationException("Request must be in progress to resolve");
        }
        
        request.setStatus(MaintenanceRequest.RequestStatus.RESOLVED);
        request.setResolutionNotes(resolutionNotes);
        request.setResolvedAt(LocalDateTime.now());
        
        MaintenanceRequest updated = maintenanceRepository.save(request);
        log.info("Maintenance request resolved: {}", id);
        
        return mapToResponse(updated);
    }
    
    @Override
    public void deleteRequest(UUID id) {
        if (!maintenanceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Maintenance request not found");
        }
        maintenanceRepository.deleteById(id);
        log.info("Maintenance request deleted: {}", id);
    }
    
    private MaintenanceResponse mapToResponse(MaintenanceRequest request) {
        return MaintenanceResponse.builder()
            .id(request.getId())
            .assetId(request.getAssetId())
            .issue(request.getIssue())
            .priority(request.getPriority())
            .status(request.getStatus())
            .requestedBy(request.getRequestedBy())
            .approvedBy(request.getApprovedBy())
            .approvedAt(request.getApprovedAt())
            .rejectedBy(request.getRejectedBy())
            .rejectedAt(request.getRejectedAt())
            .technicianAssigned(request.getTechnicianAssigned())
            .assignedAt(request.getAssignedAt())
            .resolvedAt(request.getResolvedAt())
            .resolutionNotes(request.getResolutionNotes())
            .photoUrl(request.getPhotoUrl())
            .createdAt(request.getCreatedAt())
            .updatedAt(request.getUpdatedAt())
            .build();
    }
}