package org.example.ihoparizona.Controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.ihoparizona.Entities.IhopLocation;
import org.example.ihoparizona.Entities.MainReview;
import org.example.ihoparizona.Services.IhopLocationService;
import org.example.ihoparizona.Services.MainReviewService;
import org.example.ihoparizona.dto.IhopLocationWithReviewDTO;
import org.example.ihoparizona.dto.MainReviewDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/ihopLocation")
@AllArgsConstructor
@Getter
@Setter
public class IhopLocationController {

    private final IhopLocationService ihopLocationService;
    private final MainReviewService mainReviewService;

    @PostMapping("/addIhop")
    public ResponseEntity<IhopLocation> addIhop(@Valid @RequestBody IhopLocation ihopLocation) {
        IhopLocation saved = ihopLocationService.createIhopLocation(ihopLocation);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<IhopLocation>> getAllIhopLocations() {
        return ResponseEntity.ok(ihopLocationService.getAllLocations());
    }

    @GetMapping("/list/with-main-reviews")
    public ResponseEntity<List<IhopLocationWithReviewDTO>> getAllIhopLocationsWithMainReviews() {
        List<IhopLocationWithReviewDTO> response = ihopLocationService.getAllLocations().stream()
                .map(loc -> new IhopLocationWithReviewDTO(
                        loc.getId(),
                        loc.getAddress(),
                        loc.getNickname(),
                        loc.getLatitude(),
                        loc.getLongitude(),
                        loc.getMainReview() != null ? new MainReviewDTO(
                                loc.getMainReview().getLocationRating(),
                                loc.getMainReview().getAtmosphereRating(),
                                loc.getMainReview().getQualityRating(),
                                loc.getMainReview().getServiceRating(),
                                loc.getMainReview().getCostRating(),
                                loc.getMainReview().getFinalScore()
                        ) : null
                ))
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IhopLocation> getIhopLocationById(@PathVariable Long id) {
        return ihopLocationService.getLocationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<IhopLocation> updateIhop(@PathVariable Long id, @RequestBody @Valid IhopLocation updatedData) {
        try {
            IhopLocation updated = ihopLocationService.updateIhopLocation(id, updatedData);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteIhopLocation(@PathVariable Long id) {
        try {
            ihopLocationService.deleteIhopLocation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/review")
    public ResponseEntity<MainReview> getMainReview(@PathVariable("id") Long locationID) {
        return ihopLocationService.getLocationById(locationID)
                .map(IhopLocation::getMainReview)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("{id}/review/create")
    public ResponseEntity<MainReview> createMainReview(@PathVariable("id") Long locationId, @RequestBody @Valid MainReview mainReview) {
        Optional<IhopLocation> location = ihopLocationService.getLocationById(locationId);

        if (location.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        IhopLocation ihopLocation = location.get();

        mainReview.setLocation(ihopLocation);
        ihopLocation.setMainReview(mainReview);

        MainReview saved = mainReviewService.createMainReview(mainReview);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/review/update")
    public ResponseEntity<MainReview> updateMainReview(@PathVariable("id") Long locationId, @RequestBody @Valid MainReview updatedData) {

        return ihopLocationService.getLocationById(locationId)
                .map(location -> {
                    updatedData.setLocation(location);
                    MainReview updated = mainReviewService.updateMainReview(locationId, updatedData);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("{id}/review/delete")
    public ResponseEntity<Void> deleteMainReview(@PathVariable("id") Long locationId) {
        try {
            mainReviewService.deleteMainReview(locationId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

}
