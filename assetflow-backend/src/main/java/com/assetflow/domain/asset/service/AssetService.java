package com.assetflow.domain.asset.service;

import com.assetflow.domain.asset.dto.request.CreateAssetRequest;
import com.assetflow.domain.asset.dto.request.UpdateAssetRequest;
import com.assetflow.domain.asset.dto.response.AssetResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface AssetService {
    
    AssetResponse createAsset(CreateAssetRequest request, UUID userId);
    
    AssetResponse getAssetById(UUID id);
    
    AssetResponse getAssetByTag(String assetTag);
    
    Page<AssetResponse> getAllAssets(Pageable pageable, UUID departmentId, String status, String search);
    
    AssetResponse updateAsset(UUID id, UpdateAssetRequest request);
    
    void deleteAsset(UUID id);
    
    AssetResponse allocateAsset(UUID assetId, UUID userId, UUID departmentId);
    
    AssetResponse returnAsset(UUID assetId, String conditionNotes);
}