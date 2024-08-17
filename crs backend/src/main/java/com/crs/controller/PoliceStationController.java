package com.crs.controller;

import com.crs.dto.PoliceStationDTO;
import com.crs.service.PoliceStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/police-stations")
public class PoliceStationController {

    @Autowired
    private PoliceStationService policeStationService;

    @GetMapping
    public ResponseEntity<List<PoliceStationDTO>> getAllPoliceStations() {
        List<PoliceStationDTO> policeStations = policeStationService.getAllPoliceStations();
        return new ResponseEntity<>(policeStations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PoliceStationDTO> getPoliceStationById(@PathVariable Long id) {
        PoliceStationDTO policeStation = policeStationService.getPoliceStationById(id);
        return new ResponseEntity<>(policeStation, HttpStatus.OK);
    }

    @PostMapping("/register-station")
    public ResponseEntity<PoliceStationDTO> createPoliceStation(@RequestBody PoliceStationDTO policeStationDTO) {
        PoliceStationDTO createdPoliceStation = policeStationService.createPoliceStation(policeStationDTO);
        return new ResponseEntity<>(createdPoliceStation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PoliceStationDTO> updatePoliceStation(
            @PathVariable Long id, @RequestBody PoliceStationDTO policeStationDTO) {
        PoliceStationDTO updatedPoliceStation = policeStationService.updatePoliceStation(id, policeStationDTO);
        return new ResponseEntity<>(updatedPoliceStation, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoliceStation(@PathVariable Long id) {
        policeStationService.deletePoliceStation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
