package org.example.ihoparizona.dto;

public record MainReviewDTO(
        int locationRating,
        int atmosphereRating,
        int costRating,
        int qualityRating,
        int serviceRating,
        double finalScore,
        String notesHtml
) {}
