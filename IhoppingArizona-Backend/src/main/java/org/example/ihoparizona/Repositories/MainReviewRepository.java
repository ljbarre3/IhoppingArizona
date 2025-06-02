package org.example.ihoparizona.Repositories;

import org.example.ihoparizona.Entities.MainReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MainReviewRepository extends JpaRepository<MainReview, Long> {

    Optional<MainReview> findByLocationId(Long locationId);
}
