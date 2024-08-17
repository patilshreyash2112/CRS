package com.crs.service.impl;

import com.crs.dto.PoliceOfficerDTO;
import com.crs.entities.Designation;
import com.crs.entities.PoliceOfficer;
import com.crs.entities.PoliceStation;
import com.crs.dao.PoliceOfficerRepository;
import com.crs.dao.PoliceStationRepository;
import com.crs.service.PoliceOfficerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PoliceOfficerServiceImpl implements PoliceOfficerService {

    @Autowired
    private PoliceOfficerRepository policeOfficerRepository;

    @Autowired
    private PoliceStationRepository policeStationRepository;

    @Override
    public PoliceOfficerDTO savePoliceOfficer(PoliceOfficerDTO policeOfficerDTO) {
        PoliceOfficer policeOfficer = new PoliceOfficer();
        policeOfficer.setOfficerName(policeOfficerDTO.getOfficerName());
        policeOfficer.setDesignation(policeOfficerDTO.getDesignation());
        policeOfficer.setEmail(policeOfficerDTO.getEmail());
        policeOfficer.setContactNumber(policeOfficerDTO.getContactNumber());
        policeOfficer.setDeleted(policeOfficerDTO.isDeleted());
        policeOfficer.setPassword(policeOfficerDTO.getOfficerName());

        // Fetch PoliceStation by ID and set it
        PoliceStation policeStation = policeStationRepository.findById(policeOfficerDTO.getPoliceStationId())
                .orElseThrow(() -> new RuntimeException("Police Station not found"));
        policeOfficer.setPoliceStation(policeStation);

        // Password handling for 'head' designation
        if (policeOfficer.getDesignation() == Designation.HEAD) {
            policeOfficer.setPassword(policeOfficerDTO.getOfficerName());
        }
        
        return convertToDTO(policeOfficerRepository.save(policeOfficer));
    }
    
    @Override
    public PoliceOfficerDTO login(String email, String password) {
        PoliceOfficer officer = policeOfficerRepository.findByEmail(email);

        if (officer != null && password.equals(officer.getPassword())) {
            // Convert entity to DTO
            return new PoliceOfficerDTO(
                officer.getId(),
                officer.getOfficerName(),
                officer.getEmail(),
                officer.getDesignation(),
                officer.getContactNumber(),
                officer.getPoliceStation().getId(),
                officer.isDeleted()
            );
        }

        return null; // Login failed
    }


    @Override
    public List<PoliceOfficerDTO> getAllPoliceOfficers() {
        return policeOfficerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePoliceOfficer(Long id) {
        policeOfficerRepository.deleteById(id);
    }
    
    @Override
    public List<PoliceOfficerDTO> getOfficersByStationId(Long stationId) {
        List<PoliceOfficer> officers = policeOfficerRepository.findByPoliceStationId(stationId);
        return officers.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public PoliceOfficerDTO updatePoliceOfficer(Long id, PoliceOfficerDTO policeOfficerDTO) {
        PoliceOfficer policeOfficer = policeOfficerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Police Officer not found"));

        policeOfficer.setOfficerName(policeOfficerDTO.getOfficerName());
        policeOfficer.setDesignation(policeOfficerDTO.getDesignation());
        policeOfficer.setEmail(policeOfficerDTO.getEmail());
        policeOfficer.setContactNumber(policeOfficerDTO.getContactNumber());
        policeOfficer.setDeleted(policeOfficerDTO.isDeleted());
        policeOfficer.setPassword(policeOfficerDTO.getPassword());

        // Fetch PoliceStation by ID and set it
        PoliceStation policeStation = policeStationRepository.findById(policeOfficerDTO.getPoliceStationId())
                .orElseThrow(() -> new RuntimeException("Police Station not found"));
        policeOfficer.setPoliceStation(policeStation);

        // Password handling for 'head' designation
        if (policeOfficer.getDesignation() == Designation.HEAD) {
            policeOfficer.setPassword(policeOfficerDTO.getOfficerName());
        }
        
        return convertToDTO(policeOfficerRepository.save(policeOfficer));
    }

    private PoliceOfficerDTO convertToDTO(PoliceOfficer policeOfficer) {
        PoliceOfficerDTO dto = new PoliceOfficerDTO();
        dto.setId(policeOfficer.getId());
        dto.setOfficerName(policeOfficer.getOfficerName());
        dto.setDesignation(policeOfficer.getDesignation());
        dto.setPoliceStationId(policeOfficer.getPoliceStation().getId());
        dto.setEmail(policeOfficer.getEmail());
        dto.setContactNumber(policeOfficer.getContactNumber());
        dto.setDeleted(policeOfficer.isDeleted());
        dto.setPassword(policeOfficer.getPassword());
        return dto;
    }
}

