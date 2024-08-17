package com.crs.service;

import com.crs.dto.PoliceOfficerDTO;
import com.crs.entities.PoliceOfficer;

import java.util.List;

public interface PoliceOfficerService {
    PoliceOfficerDTO savePoliceOfficer(PoliceOfficerDTO policeOfficerDTO);
    List<PoliceOfficerDTO> getAllPoliceOfficers();
    void deletePoliceOfficer(Long id);
    PoliceOfficerDTO updatePoliceOfficer(Long id, PoliceOfficerDTO policeOfficerDTO);
    List<PoliceOfficerDTO> getOfficersByStationId(Long stationId);
    PoliceOfficerDTO login(String email, String password);
}
