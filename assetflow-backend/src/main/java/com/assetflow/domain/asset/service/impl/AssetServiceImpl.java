package com.assetflow.domain.asset.service.impl;

import com.assetflow.domain.asset.dto.request.CreateAssetRequest;
import com.assetflow.domain.asset.dto.request.UpdateAssetRequest;
import com.assetflow.domain.asset.dto.response.AssetResponse;
import com.assetflow.domain.asset.entity.Asset;
import com.assetflow.domain.asset.repository.AssetRepository;
import com.assetflow.domain.asset.service.AssetService;
import com.assetflow.infrastructure.exception.ResourceNotFoundException;
import com.assetflow.infrastructure.exception.UnauthorizedException;
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
public class AssetServiceImpl implements AssetService {
    
    private final AssetRepository assetRepository;
    
    @Override
    public AssetResponse createAsset(CreateAssetRequest request, UUID userId) {
        log.info("Creating new asset: {}", request.getName());
        
        // Validate unique asset tag
        String assetTag = generateAssetTag();
        if (assetRepository.existsByAssetTag(assetTag)) {
            throw new ValidationException("Asset tag already exists");
        }
        
        Asset asset = Asset.builder()
            .assetTag(assetTag)
            .name(request.getName())
            .description(request.getDescription())
            .categoryId(request.getCategoryId())
            .serialNumber(request.getSerialNumber())
            .acquisitionDate(request.getAcquisitionDate())
            .acquisitionCost(request.getAcquisitionCost())
            .condition(request.getCondition() != null ? request.getCondition() : Asset.AssetCondition.GOOD)
            .location(request.getLocation())
            .currentStatus(Asset.AssetStatus.AVAILABLE)
            .isSharedBookable(request.isSharedBookable())
            .createdBy(userId)
            .build();
        
        Asset savedAsset = assetRepository.save(asset);
        log.info("Asset created successfully with tag: {}", assetTag);
        
        return mapToAssetResponse(savedAsset);
    }
    
    @Override
    @Transactional(readOnly = true)
    public AssetResponse getAssetById(UUID id) {
        Asset asset = assetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Asset not found with ID: " + id));
        return mapToAssetResponse(asset);
    }
    
    @Override
    @Transactional(readOnly = true)
    public AssetResponse getAssetByTag(String assetTag) {
        Asset asset = assetRepository.findByAssetTag(assetTag)
            .orElseThrow(() -> new ResourceNotFoundException("Asset not found with tag: " + assetTag));
        return mapToAssetResponse(asset);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<AssetResponse> getAllAssets(Pageable pageable, UUID departmentId, String status, String search) {
        // Implementation with specifications would go here
        Page<Asset> assets = assetRepository.findAll(pageable);
        return assets.map(this::mapToAssetResponse);
    }
    
    @Override
    public AssetResponse updateAsset(UUID id, UpdateAssetRequest request) {
        Asset asset = assetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Asset not found with ID: " + id));
        
        if (request.getName() != null) {
            asset.setName(request.getName());
        }
        if (request.getDescription() != null) {
            asset.setDescription(request.getDescription());
        }
        if (request.getLocation() != null) {
            asset.setLocation(request.getLocation());
        }
        if (request.getCondition() != null) {
            asset.setCondition(request.getCondition());
        }
        if (request.getSerialNumber() != null) {
            asset.setSerialNumber(request.getSerialNumber());
        }
        
        Asset updatedAsset = assetRepository.save(asset);
        log.info("Asset updated successfully: {}", updatedAsset.getId());
        
        return mapToAssetResponse(updatedAsset);
    }
    
    @Override
    public void deleteAsset(UUID id) {
        if (!assetRepository.existsById(id)) {
            throw new ResourceNotFoundException("Asset not found with ID: " + id);
        }
        assetRepository.deleteById(id);
        log.info("Asset deleted successfully: {}", id);
    }
    
    @Override
    public AssetResponse allocateAsset(UUID assetId, UUID userId, UUID departmentId) {
        Asset asset = assetRepository.findById(assetId)
            .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
        
        if (asset.getCurrentStatus() != Asset.AssetStatus.AVAILABLE) {
            throw new ValidationException("Asset is not available for allocation");
        }
        
        asset.setCurrentHolderId(userId);
        asset.setCurrentDepartmentId(departmentId);
        asset.setCurrentStatus(Asset.AssetStatus.ALLOCATED);
        
        Asset updatedAsset = assetRepository.save(asset);
        log.info("Asset allocated successfully: {} to user: {}", assetId, userId);
        
        return mapToAssetResponse(updatedAsset);
    }
    
    @Override
    public AssetResponse returnAsset(UUID assetId, String conditionNotes) {
        Asset asset = assetRepository.findById(assetId)
            .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
        
        if (asset.getCurrentStatus() != Asset.AssetStatus.ALLOCATED) {
            throw new ValidationException("Asset is not currently allocated");
        }
        
        asset.setCurrentHolderId(null);
        asset.setCurrentDepartmentId(null);
        asset.setCurrentStatus(Asset.AssetStatus.AVAILABLE);
        
        Asset updatedAsset = assetRepository.save(asset);
        log.info("Asset returned successfully: {}", assetId);
        
        return mapToAssetResponse(updatedAsset);
    }
    
    private String generateAssetTag() {
        long count = assetRepository.count() + 1;
        return String.format("AF-%04d", count);
    }
    
    private AssetResponse mapToAssetResponse(Asset asset) {
        return AssetResponse.builder()
            .id(asset.getId())
            .assetTag(asset.getAssetTag())
            .name(asset.getName())
            .description(asset.getDescription())
            .categoryId(asset.getCategoryId())
            .serialNumber(asset.getSerialNumber())
            .acquisitionDate(asset.getAcquisitionDate())
            .acquisitionCost(asset.getAcquisitionCost())
            .condition(asset.getCondition())
            .location(asset.getLocation())
            .currentStatus(asset.getCurrentStatus())
            .isSharedBookable(asset.isSharedBookable())
            .currentHolderId(asset.getCurrentHolderId())
            .currentDepartmentId(asset.getCurrentDepartmentId())
            .createdAt(asset.getCreatedAt())
            .updatedAt(asset.getUpdatedAt())
            .build();
    }
}