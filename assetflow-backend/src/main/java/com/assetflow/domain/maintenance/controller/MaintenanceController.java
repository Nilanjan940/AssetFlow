package com.assetflow.domain.maintenance.controller;

import com.assetflow.domain.maintenance.dto.request.CreateMaintenanceRequest;
import com.assetflow.domain.maintenance.dto.request.UpdateMaintenanceRequest;
import com.assetflow.domain.maintenance.dto.response.MaintenanceResponse;
import com.assetflow.domain.maintenance.service.MaintenanceService;
import com.assetflow.shared.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/maintenance")
@RequiredArgsConstructor
public class MaintenanceController {
    
    private final MaintenanceService maintenanceService;
    
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<MaintenanceResponse>> createRequest(
            @Valid @RequestBody CreateMaintenanceRequest request) {
        MaintenanceResponse response = maintenanceService.createRequest(request, getCurrentUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Maintenance request created successfully", response));
    }
    
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<MaintenanceResponse>>> getAllRequests(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority) {
        Page<MaintenanceResponse> requests = maintenanceService.getAllRequests(pageable, status, priority);
        return ResponseEntity.ok(ApiResponse.success("Maintenance requests retrieved successfully", requests));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<MaintenanceResponse>> getRequestById(@PathVariable UUID id) {
        MaintenanceResponse response = maintenanceService.getRequestById(id);
        return ResponseEntity.ok(ApiResponse.success("Maintenance request retrieved successfully", response));
    }
    
    @PostMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSET_MANAGER')")
    public ResponseEntity<ApiResponse<MaintenanceResponse>> approveRequest(@PathVariable UUID id) {
        MaintenanceResponse response = maintenanceService.approveRequest(id, getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success("Maintenance request approved", response));
    }
    
    @PostMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSET_MANAGER')")
    public ResponseEntity<ApiResponse<MaintenanceResponse>> rejectRequest(
            @PathVariable UUID id,
            @RequestParam String reason) {
        MaintenanceResponse response = maintenanceService.rejectRequest(id, getCurrentUserId(), reason);
        return ResponseEntity.ok(ApiResponse.success("Maintenance request rejected", response));
    }
    
    @PostMapping("/{id}/assign")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSET_MANAGER')")
    public ResponseEntity<ApiResponse<MaintenanceResponse>> assignTechnician(
            @PathVariable UUID id,
            @RequestParam UUID technicianId) {
        MaintenanceResponse response = maintenanceService.assignTechnician(id, technicianId);
        return ResponseEntity.ok(ApiResponse.success("Technician assigned successfully", response));
    }
    
    @PostMapping("/{id}/resolve")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSET_MANAGER')")
    public ResponseEntity<ApiResponse<MaintenanceResponse>> resolveRequest(
            @PathVariable UUID id,
            @RequestParam String resolutionNotes) {
        MaintenanceResponse response = maintenanceService.resolveRequest(id, resolutionNotes);
        return ResponseEntity.ok(ApiResponse.success("Maintenance request resolved", response));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteRequest(@PathVariable UUID id) {
        maintenanceService.deleteRequest(id);
        return ResponseEntity.ok(ApiResponse.success("Maintenance request deleted", null));
    }
    
    private UUID getCurrentUserId() {
        return UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    }
}