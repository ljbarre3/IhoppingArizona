package org.example.ihoparizona.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FriendReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String friendName;
    private String itemOrdered;
    private int personalRating; // Rating out of 10

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ihop_location_id", nullable = false)
    @JsonBackReference
    private IhopLocation location;
}
