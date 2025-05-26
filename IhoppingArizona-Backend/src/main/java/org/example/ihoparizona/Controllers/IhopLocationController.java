package org.example.ihoparizona.Controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.ihoparizona.Entities.IhopLocation;
import org.example.ihoparizona.Services.IhopLocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ihopLocation")
@AllArgsConstructor
@Getter
@Setter
public class IhopLocationController {

    private final IhopLocationService ihopLocationService;

    @PostMapping("/addIhop")
    public ResponseEntity<IhopLocation> addIhop(@Valid @RequestBody IhopLocation ihopLocation) {
        IhopLocation saved = ihopLocationService.createIhopLocation(ihopLocation);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<IhopLocation>> getAllIhopLocations() {
        return ResponseEntity.ok(ihopLocationService.getAllLocations());
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
}
