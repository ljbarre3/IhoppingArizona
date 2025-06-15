package org.example.ihoparizona.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MainReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(0) @Max(3)
    private int locationRating;
    @Min(0) @Max(10)
    private int atmosphereRating;
    @Min(0) @Max(10)
    private int qualityRating;
    @Min(0) @Max(10)
    private int costRating;
    @Min(0) @Max(10)
    private int serviceRating;

    private double finalScore; // Final calculated score

    @Column(columnDefinition = "TEXT")
    private String notesHtml;

    @OneToOne
    @JoinColumn(name = "ihop_location_id", nullable = false, unique = true)
    @JsonBackReference
    private IhopLocation location;
}
