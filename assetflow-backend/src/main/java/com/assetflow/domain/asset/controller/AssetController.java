package com.assetflow.domain.asset.controller;

import com.assetflow.domain.asset.dto.request.CreateAssetRequest;
import com.assetflow.domain.asset.dto.request.UpdateAssetRequest;
import com.assetflow.domain.asset.dto.response.AssetResponse;
import com.assetflow.domain.asset.service.AssetService;
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
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
public class AssetController {
    
    private final AssetService assetService;
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSET_MANAGER')")
    public ResponseEntity<ApiResponse<AssetResponse>> createAsset(
            @Valid @RequestBody CreateAssetRequest request) {
        AssetResponse response = assetService.createAsset(request, getCurrentUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Asset created successfully", response));
    }
    
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<AssetResponse>>> getAllAssets(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) UUID departmentId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        Page<AssetResponse> assets = assetService.getAllAssets(pageable, departmentId, status, search);
        return ResponseEntity.ok(ApiResponse.success("Assets retrieved successfully", assets));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<AssetResponse>> getAssetById(@PathVariable UUID id) {
        AssetResponse response = assetService.getAssetById(id);
        return ResponseEntity.ok(ApiResponse.success("Asset retrieved successfully", response));
    }
    
    @GetMapping("/tag/{assetTag}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<AssetResponse>> getAssetByTag(@PathVariable String assetTag) {
        AssetResponse response = assetService.getAssetByTag(assetTag);
        return ResponseEntity.ok(ApiResponse.success("Asset retrieved successfully", response));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSET_MANAGER')")
    public ResponseEntity<ApiResponse<AssetResponse>> updateAsset(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateAssetRequest request) {
        AssetResponse response = assetService.updateAsset(id, request);
        return ResponseEntity.ok(ApiResponse.success("Asset updated successfully", response));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteAsset(@PathVariable UUID id) {
        assetService.deleteAsset(id);
        return ResponseEntity.ok(ApiResponse.success("Asset deleted successfully", null));
    }
    
    @PostMapping("/{id}/allocate")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD')")
    public ResponseEntity<ApiResponse<AssetResponse>> allocateAsset(
            @PathVariable UUID id,
            @RequestParam UUID userId,
            @RequestParam(required = false) UUID departmentId) {
        AssetResponse response = assetService.allocateAsset(id, userId, departmentId);
        return ResponseEntity.ok(ApiResponse.success("Asset allocated successfully", response));
    }
    
    @PostMapping("/{id}/return")
    @PreAuthorize("hasAnyRole('ADMIN', 'ASSET_MANAGER')")
    public ResponseEntity<ApiResponse<AssetResponse>> returnAsset(
            @PathVariable UUID id,
            @RequestParam(required = false) String conditionNotes) {
        AssetResponse response = assetService.returnAsset(id, conditionNotes);
        return ResponseEntity.ok(ApiResponse.success("Asset returned successfully", response));
    }
    
    private UUID getCurrentUserId() {
        // This would come from SecurityContext
        // For now, return a dummy UUID
        return UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    }
}