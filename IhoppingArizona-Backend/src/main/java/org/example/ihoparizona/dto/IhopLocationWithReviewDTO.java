package org.example.ihoparizona.dto;

public record IhopLocationWithReviewDTO (
    Long id,
    String address,
    String nickname,
    double latitude,
    double longitude,
    MainReviewDTO mainReview
) {}
