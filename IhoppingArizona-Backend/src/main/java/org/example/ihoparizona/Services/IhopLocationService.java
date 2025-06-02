package org.example.ihoparizona.Services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.example.ihoparizona.Entities.IhopLocation;
import org.example.ihoparizona.Repositories.IhopLocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IhopLocationService {

    private final IhopLocationRepository ihopLocationRepository;

    public IhopLocationService(IhopLocationRepository ihopLocationRepository) {
        this.ihopLocationRepository = ihopLocationRepository;
    }

    //GET

    public List<IhopLocation> getAllLocations() {
        return ihopLocationRepository.findAll();
    }

    public Optional<IhopLocation> getLocationById(Long id) {
        return ihopLocationRepository.findById(id);
    }

    //Create
    public IhopLocation createIhopLocation(IhopLocation ihopLocation) {
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
            return ihopLocationRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Ihop location not found"));
    }

    //delete
    @Transactional
    public void deleteIhopLocation(Long id) {
        if (!ihopLocationRepository.existsById(id)) {
            throw new EntityNotFoundException("IHOP Location with ID " + id + " not found");
        }
        ihopLocationRepository.deleteById(id);
    }
}
