package com.crs.controller;

import com.crs.dto.PoliceOfficerDTO;
import com.crs.service.PoliceOfficerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/police-officers")
public class PoliceOfficerController {
	
    @Autowired
    private PoliceOfficerService policeOfficerService;
    
    @CrossOrigin
    @PostMapping("/register-officer")
    public ResponseEntity<PoliceOfficerDTO> createPoliceOfficer(@RequestBody PoliceOfficerDTO policeOfficerDTO) {
    	System.out.println(policeOfficerDTO);
        PoliceOfficerDTO createdOfficer = policeOfficerService.savePoliceOfficer(policeOfficerDTO);
        return ResponseEntity.ok(createdOfficer);
    }
    
    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<PoliceOfficerDTO> loginPoliceOfficer(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        PoliceOfficerDTO officerDTO = policeOfficerService.login(email, password);

        if (officerDTO != null) {
            return ResponseEntity.ok(officerDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<PoliceOfficerDTO>> getAllPoliceOfficers() {
        List<PoliceOfficerDTO> officers = policeOfficerService.getAllPoliceOfficers();
        return ResponseEntity.ok(officers);
    }
    
//    @CrossOrigin
//    @GetMapping("/{id}")
//    public ResponseEntity<PoliceOfficerDTO> getPoliceOfficerById(@PathVariable("id") Long id) {
//        PoliceOfficerDTO officer = policeOfficerService.getAllPoliceOfficers().stream()
//                .filter(o -> o.getId().equals(id))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Police Officer not found"));
//        return ResponseEntity.ok(officer);
//    }
    
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<PoliceOfficerDTO> getPoliceOfficerById(@PathVariable("id") Long id) {
        PoliceOfficerDTO officer = policeOfficerService.getAllPoliceOfficers().stream()
                .filter(o -> o.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Police Officer not found"));
        return ResponseEntity.ok(officer);
    }
    
    @CrossOrigin
    @GetMapping("/policeOfficersByStation/{stationId}")
    public ResponseEntity<List<PoliceOfficerDTO>> getPoliceOfficersByStation(@PathVariable Long stationId) {
        List<PoliceOfficerDTO> officers = policeOfficerService.getOfficersByStationId(stationId);
        return ResponseEntity.ok(officers);
    }
    
    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<PoliceOfficerDTO> updatePoliceOfficer(
            @PathVariable("id") Long id,
            @RequestBody PoliceOfficerDTO policeOfficerDTO) {
        PoliceOfficerDTO updatedOfficer = policeOfficerService.updatePoliceOfficer(id, policeOfficerDTO);
        return ResponseEntity.ok(updatedOfficer);
    }
    
    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoliceOfficer(@PathVariable("id") Long id) {
        policeOfficerService.deletePoliceOfficer(id);
        return ResponseEntity.noContent().build();
    }
}
