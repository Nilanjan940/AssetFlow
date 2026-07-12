package com.assetflow.domain.booking.dto.request;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class UpdateBookingRequest {
    
    private String title;
    
    private String description;
    
    private LocalDateTime startTime;
    
    private LocalDateTime endTime;
    
    private String purpose;
    
    private UUID[] attendees;
}