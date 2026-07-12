package com.assetflow.domain.booking.dto.response;

import com.assetflow.domain.booking.entity.Booking;
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
public class BookingResponse {
    private UUID id;
    private UUID assetId;
    private UUID bookedBy;
    private UUID departmentId;
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Booking.BookingStatus status;
    private String purpose;
    private UUID[] attendees;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}