package org.example.ihoparizona.Entities;

import jakarta.persistence.*;
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

    private double latitude;
    private double longitude;

    // Ratings out of 10
    private int locationRating;
    private int atmosphereRating;
    private int qualityRating;
    private int costRating;
    private int serviceRating;

    private double finalScore; // Final calculated score

    @OneToMany(mappedBy = "ihopLocation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<FriendReview> friendReviews;
}
