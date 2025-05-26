package org.example.ihoparizona.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class IhopLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    private String nickname;

    @DecimalMin(value = "-90.0") @DecimalMax(value = "90.0")
    @NotNull
    private double latitude;

    @DecimalMin(value = "-180.0") @DecimalMax(value = "180.0")
    @NotNull
    private double longitude;

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

    @OneToMany(mappedBy = "ihopLocation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<FriendReview> friendReviews;
}
