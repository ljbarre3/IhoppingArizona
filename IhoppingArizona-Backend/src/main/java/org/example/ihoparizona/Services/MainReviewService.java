package org.example.ihoparizona.Services;

import jakarta.transaction.Transactional;
import org.example.ihoparizona.Entities.IhopLocation;
import org.example.ihoparizona.Entities.MainReview;
import org.example.ihoparizona.Repositories.IhopLocationRepository;
import org.example.ihoparizona.Repositories.MainReviewRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MainReviewService {

    private final MainReviewRepository mainReviewRepository;
    private final IhopLocationRepository ihopLocationRepository;

    public MainReviewService(MainReviewRepository mainReviewRepository, IhopLocationRepository ihopLocationRepository) {
        this.mainReviewRepository = mainReviewRepository;
        this.ihopLocationRepository = ihopLocationRepository;
    }


    //GET

    public Optional<MainReview> getMainReviewById(Long id) {
        return mainReviewRepository.findById(id);
    }

    //CREATE

    public MainReview createMainReview(MainReview mainReview) {
        calculateFinalScore(mainReview);
        return mainReviewRepository.save(mainReview);
    }

    //Update
    @Transactional
    public MainReview updateMainReview(Long locationId, MainReview updatedMainReview) {
        MainReview existing = mainReviewRepository.findByLocationId(locationId)
                .orElseThrow(() -> new RuntimeException("MainReview not found for location ID: " + locationId));

            existing.setLocationRating(updatedMainReview.getLocationRating());
            existing.setAtmosphereRating(updatedMainReview.getAtmosphereRating());
            existing.setQualityRating(updatedMainReview.getQualityRating());
            existing.setCostRating(updatedMainReview.getCostRating());
            existing.setServiceRating(updatedMainReview.getServiceRating());
            existing.setFinalScore(updatedMainReview.getFinalScore());
            calculateFinalScore(existing);

            IhopLocation location = existing.getLocation();
            location.setMainReview(existing);

            return mainReviewRepository.save(existing);
    }

    //Delete
    @Transactional
    public void deleteMainReview(Long locationId) {
        MainReview existing = mainReviewRepository.findByLocationId(locationId)
                .orElseThrow(() -> new RuntimeException("MainReview not found for location ID: " + locationId));

        IhopLocation location = existing.getLocation();
        if(location.getMainReview() != null) {
            location.setMainReview(null);
            ihopLocationRepository.save(location);
        }
    }


    private void calculateFinalScore(MainReview mainReview) {
        int total = mainReview.getLocationRating()
                + mainReview.getAtmosphereRating()
                + mainReview.getQualityRating()
                + mainReview.getCostRating()
                + mainReview.getServiceRating();

        mainReview.setFinalScore(total);
    }


}
