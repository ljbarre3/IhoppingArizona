package org.example.ihoparizona.dto;

public record MainReviewDTO(
        int locationRating,
        int atmosphereRating,
        int qualityRating,
        int serviceRating,
        double finalScore
) {}
