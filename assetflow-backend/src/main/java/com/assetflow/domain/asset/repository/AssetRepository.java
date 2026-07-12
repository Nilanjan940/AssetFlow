package com.assetflow.domain.asset.repository;

import com.assetflow.domain.asset.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AssetRepository extends JpaRepository<Asset, UUID> {
    
    Optional<Asset> findByAssetTag(String assetTag);
    
    Optional<Asset> findBySerialNumber(String serialNumber);
    
    List<Asset> findByCurrentStatus(Asset.AssetStatus status);
    
    List<Asset> findByCurrentHolderId(UUID holderId);
    
    List<Asset> findByCurrentDepartmentId(UUID departmentId);
    
    boolean existsByAssetTag(String assetTag);
}