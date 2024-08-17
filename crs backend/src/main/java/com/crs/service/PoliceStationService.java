package com.crs.service;

import com.crs.dto.PoliceStationDTO;

import java.util.List;

public interface PoliceStationService {
    List<PoliceStationDTO> getAllPoliceStations();
    PoliceStationDTO getPoliceStationById(Long id);
    PoliceStationDTO createPoliceStation(PoliceStationDTO policeStationDTO);
    PoliceStationDTO updatePoliceStation(Long id, PoliceStationDTO policeStationDTO);
    void deletePoliceStation(Long id);
}
