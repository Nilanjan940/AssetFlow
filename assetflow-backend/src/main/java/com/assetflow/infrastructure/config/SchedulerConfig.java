package com.assetflow.infrastructure.config;

import com.assetflow.domain.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SchedulerConfig {
    
    private final BookingService bookingService;
    
    // Run every minute to update booking statuses
    @Scheduled(fixedDelay = 60000)
    public void updateBookingStatuses() {
        try {
            bookingService.processOngoingBookings();
            bookingService.processCompletedBookings();
        } catch (Exception e) {
            log.error("Error updating booking statuses: {}", e.getMessage());
        }
    }
}