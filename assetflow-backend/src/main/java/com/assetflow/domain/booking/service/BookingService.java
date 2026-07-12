package com.assetflow.domain.booking.service;

import com.assetflow.domain.booking.dto.request.CreateBookingRequest;
import com.assetflow.domain.booking.dto.request.UpdateBookingRequest;
import com.assetflow.domain.booking.dto.response.BookingResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface BookingService {
    
    BookingResponse createBooking(CreateBookingRequest request, UUID userId);
    
    BookingResponse getBookingById(UUID id);
    
    Page<BookingResponse> getAllBookings(Pageable pageable, UUID departmentId, String status);
    
    List<BookingResponse> getBookingsByAsset(UUID assetId);
    
    List<BookingResponse> getBookingsByUser(UUID userId);
    
    BookingResponse updateBooking(UUID id, UpdateBookingRequest request);
    
    void cancelBooking(UUID id);
    
    boolean checkAvailability(UUID assetId, LocalDateTime startTime, LocalDateTime endTime);
    
    void processOngoingBookings();
    
    void processCompletedBookings();
}