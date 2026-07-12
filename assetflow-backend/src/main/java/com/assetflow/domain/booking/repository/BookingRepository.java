package com.assetflow.domain.booking.repository;

import com.assetflow.domain.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    
    List<Booking> findByAssetId(UUID assetId);
    
    List<Booking> findByBookedBy(UUID bookedBy);
    
    List<Booking> findByDepartmentId(UUID departmentId);
    
    List<Booking> findByStatus(Booking.BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.assetId = :assetId " +
           "AND b.status != 'CANCELLED' " +
           "AND ((b.startTime <= :endTime AND b.endTime >= :startTime))")
    List<Booking> findOverlappingBookings(
            @Param("assetId") UUID assetId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
    
    @Query("SELECT b FROM Booking b WHERE b.startTime <= :now AND b.endTime > :now AND b.status = 'UPCOMING'")
    List<Booking> findOngoingBookings(@Param("now") LocalDateTime now);
    
    @Query("SELECT b FROM Booking b WHERE b.endTime < :now AND b.status = 'UPCOMING'")
    List<Booking> findCompletedBookings(@Param("now") LocalDateTime now);
}