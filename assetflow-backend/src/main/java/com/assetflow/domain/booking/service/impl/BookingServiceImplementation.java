package com.assetflow.domain.booking.service.impl;

import com.assetflow.domain.booking.dto.request.CreateBookingRequest;
import com.assetflow.domain.booking.dto.request.UpdateBookingRequest;
import com.assetflow.domain.booking.dto.response.BookingResponse;
import com.assetflow.domain.booking.entity.Booking;
import com.assetflow.domain.booking.repository.BookingRepository;
import com.assetflow.domain.booking.service.BookingService;
import com.assetflow.infrastructure.exception.ResourceNotFoundException;
import com.assetflow.infrastructure.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BookingServiceImpl implements BookingService {
    
    private final BookingRepository bookingRepository;
    
    @Override
    public BookingResponse createBooking(CreateBookingRequest request, UUID userId) {
        log.info("Creating new booking for asset: {}", request.getAssetId());
        
        // Check availability
        if (!checkAvailability(request.getAssetId(), request.getStartTime(), request.getEndTime())) {
            throw new ValidationException("The resource is already booked for the selected time slot");
        }
        
        Booking booking = Booking.builder()
            .assetId(request.getAssetId())
            .bookedBy(userId)
            .departmentId(request.getDepartmentId())
            .title(request.getTitle())
            .description(request.getDescription())
            .startTime(request.getStartTime())
            .endTime(request.getEndTime())
            .status(Booking.BookingStatus.UPCOMING)
            .purpose(request.getPurpose())
            .attendees(request.getAttendees())
            .build();
        
        Booking savedBooking = bookingRepository.save(booking);
        log.info("Booking created successfully with ID: {}", savedBooking.getId());
        
        return mapToBookingResponse(savedBooking);
    }
    
    @Override
    @Transactional(readOnly = true)
    public BookingResponse getBookingById(UUID id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        return mapToBookingResponse(booking);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<BookingResponse> getAllBookings(Pageable pageable, UUID departmentId, String status) {
        Page<Booking> bookings;
        if (departmentId != null) {
            bookings = (Page<Booking>) bookingRepository.findByDepartmentId(departmentId);
        } else if (status != null) {
            try {
                Booking.BookingStatus bookingStatus = Booking.BookingStatus.valueOf(status.toUpperCase());
                bookings = (Page<Booking>) bookingRepository.findByStatus(bookingStatus);
            } catch (IllegalArgumentException e) {
                bookings = bookingRepository.findAll(pageable);
            }
        } else {
            bookings = bookingRepository.findAll(pageable);
        }
        return bookings.map(this::mapToBookingResponse);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getBookingsByAsset(UUID assetId) {
        return bookingRepository.findByAssetId(assetId).stream()
            .map(this::mapToBookingResponse)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getBookingsByUser(UUID userId) {
        return bookingRepository.findByBookedBy(userId).stream()
            .map(this::mapToBookingResponse)
            .collect(Collectors.toList());
    }
    
    @Override
    public BookingResponse updateBooking(UUID id, UpdateBookingRequest request) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        
        if (request.getTitle() != null) {
            booking.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            booking.setDescription(request.getDescription());
        }
        if (request.getStartTime() != null && request.getEndTime() != null) {
            // Check availability for updated time
            if (!checkAvailability(booking.getAssetId(), request.getStartTime(), request.getEndTime())) {
                throw new ValidationException("The resource is already booked for the selected time slot");
            }
            booking.setStartTime(request.getStartTime());
            booking.setEndTime(request.getEndTime());
        }
        if (request.getPurpose() != null) {
            booking.setPurpose(request.getPurpose());
        }
        
        Booking updatedBooking = bookingRepository.save(booking);
        log.info("Booking updated successfully: {}", updatedBooking.getId());
        
        return mapToBookingResponse(updatedBooking);
    }
    
    @Override
    public void cancelBooking(UUID id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        
        if (booking.getStatus() == Booking.BookingStatus.COMPLETED) {
            throw new ValidationException("Cannot cancel a completed booking");
        }
        
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        log.info("Booking cancelled: {}", id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean checkAvailability(UUID assetId, LocalDateTime startTime, LocalDateTime endTime) {
        if (startTime.isAfter(endTime) || startTime.isBefore(LocalDateTime.now())) {
            throw new ValidationException("Invalid time slot");
        }
        
        List<Booking> overlapping = bookingRepository.findOverlappingBookings(assetId, startTime, endTime);
        return overlapping.isEmpty();
    }
    
    @Override
    @Transactional
    public void processOngoingBookings() {
        LocalDateTime now = LocalDateTime.now();
        List<Booking> ongoing = bookingRepository.findOngoingBookings(now);
        for (Booking booking : ongoing) {
            booking.setStatus(Booking.BookingStatus.ONGOING);
            bookingRepository.save(booking);
        }
        if (!ongoing.isEmpty()) {
            log.info("Updated {} bookings to ONGOING status", ongoing.size());
        }
    }
    
    @Override
    @Transactional
    public void processCompletedBookings() {
        LocalDateTime now = LocalDateTime.now();
        List<Booking> completed = bookingRepository.findCompletedBookings(now);
        for (Booking booking : completed) {
            booking.setStatus(Booking.BookingStatus.COMPLETED);
            bookingRepository.save(booking);
        }
        if (!completed.isEmpty()) {
            log.info("Updated {} bookings to COMPLETED status", completed.size());
        }
    }
    
    private BookingResponse mapToBookingResponse(Booking booking) {
        return BookingResponse.builder()
            .id(booking.getId())
            .assetId(booking.getAssetId())
            .bookedBy(booking.getBookedBy())
            .departmentId(booking.getDepartmentId())
            .title(booking.getTitle())
            .description(booking.getDescription())
            .startTime(booking.getStartTime())
            .endTime(booking.getEndTime())
            .status(booking.getStatus())
            .purpose(booking.getPurpose())
            .attendees(booking.getAttendees())
            .createdAt(booking.getCreatedAt())
            .updatedAt(booking.getUpdatedAt())
            .build();
    }
}