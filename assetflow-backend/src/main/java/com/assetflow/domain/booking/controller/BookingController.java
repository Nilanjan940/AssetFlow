package com.assetflow.domain.booking.controller;

import com.assetflow.domain.booking.dto.request.CreateBookingRequest;
import com.assetflow.domain.booking.dto.request.UpdateBookingRequest;
import com.assetflow.domain.booking.dto.response.BookingResponse;
import com.assetflow.domain.booking.service.BookingService;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {
    
    private final BookingService bookingService;
    
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @Valid @RequestBody CreateBookingRequest request) {
        BookingResponse response = bookingService.createBooking(request, getCurrentUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Booking created successfully", response));
    }
    
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<BookingResponse>>> getAllBookings(
            @PageableDefault(size = 10, sort = "startTime", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) UUID departmentId,
            @RequestParam(required = false) String status) {
        Page<BookingResponse> bookings = bookingService.getAllBookings(pageable, departmentId, status);
        return ResponseEntity.ok(ApiResponse.success("Bookings retrieved successfully", bookings));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(@PathVariable UUID id) {
        BookingResponse response = bookingService.getBookingById(id);
        return ResponseEntity.ok(ApiResponse.success("Booking retrieved successfully", response));
    }
    
    @GetMapping("/asset/{assetId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getBookingsByAsset(@PathVariable UUID assetId) {
        List<BookingResponse> bookings = bookingService.getBookingsByAsset(assetId);
        return ResponseEntity.ok(ApiResponse.success("Bookings retrieved successfully", bookings));
    }
    
    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings() {
        List<BookingResponse> bookings = bookingService.getBookingsByUser(getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success("Your bookings retrieved successfully", bookings));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<BookingResponse>> updateBooking(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateBookingRequest request) {
        BookingResponse response = bookingService.updateBooking(id, request);
        return ResponseEntity.ok(ApiResponse.success("Booking updated successfully", response));
    }
    
    @PostMapping("/{id}/cancel")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> cancelBooking(@PathVariable UUID id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", null));
    }
    
    @GetMapping("/check-availability")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Boolean>> checkAvailability(
            @RequestParam UUID assetId,
            @RequestParam LocalDateTime startTime,
            @RequestParam LocalDateTime endTime) {
        boolean available = bookingService.checkAvailability(assetId, startTime, endTime);
        return ResponseEntity.ok(ApiResponse.success("Availability checked", available));
    }
    
    private UUID getCurrentUserId() {
        // This would come from SecurityContext
        return UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    }
}