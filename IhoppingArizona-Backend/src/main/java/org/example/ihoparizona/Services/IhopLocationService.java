package org.example.ihoparizona.Services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.ihoparizona.Entities.IhopLocation;
import org.example.ihoparizona.Repositories.IhopLocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class IhopLocationService {

    private IhopLocationRepository ihopLocationRepository;

    //GET

    public List<IhopLocation> getAllLocations() {
        return ihopLocationRepository.findAll();
    }

    public Optional<IhopLocation> getLocationById(Long id) {
        return ihopLocationRepository.findById(id);
    }

    //Create
    public IhopLocation createIhopLocation(IhopLocation ihopLocation) {
        calculateFinalScore(ihopLocation);
        return ihopLocationRepository.save(ihopLocation);
    }

    //update
    @Transactional
    public IhopLocation updateIhopLocation(Long id, IhopLocation newData) {
        return ihopLocationRepository.findById(id).map(existing -> {
            existing.setAddress(newData.getAddress());
            existing.setNickname(newData.getNickname());
            existing.setLatitude(newData.getLatitude());
            existing.setLongitude(newData.getLongitude());
            existing.setLocationRating(newData.getLocationRating());
            existing.setAtmosphereRating(newData.getAtmosphereRating());
            existing.setQualityRating(newData.getQualityRating());
            existing.setCostRating(newData.getCostRating());
            existing.setServiceRating(newData.getServiceRating());
            existing.setFinalScore(newData.getFinalScore());
            calculateFinalScore(existing);
            return ihopLocationRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Ihop location not found"));
    }

    //delete
    public void deleteIhopLocation(Long id) {
        ihopLocationRepository.deleteById(id);
    }

    private void calculateFinalScore(IhopLocation ihopLocation) {
        int total = ihopLocation.getLocationRating()
                + ihopLocation.getAtmosphereRating()
                + ihopLocation.getQualityRating()
                + ihopLocation.getCostRating()
                + ihopLocation.getServiceRating();

        ihopLocation.setFinalScore(total);
    }
}
