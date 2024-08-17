package com.crs.service.impl;

import com.crs.dto.PoliceStationDTO;
import com.crs.dto.AddressDTO;
import com.crs.entities.PoliceStation;
import com.crs.entities.Address;
import com.crs.dao.PoliceStationRepository;
import com.crs.service.PoliceStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PoliceStationServiceImpl implements PoliceStationService {

    @Autowired
    private PoliceStationRepository policeStationRepository;

    @Override
    public List<PoliceStationDTO> getAllPoliceStations() {
        return policeStationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PoliceStationDTO getPoliceStationById(Long id) {
        Optional<PoliceStation> policeStation = policeStationRepository.findById(id);
        return policeStation.map(this::convertToDTO).orElse(null);
    }

    @Override
    public PoliceStationDTO createPoliceStation(PoliceStationDTO policeStationDTO) {
        validateAddress(policeStationDTO.getAddress()); // Add validation here
        PoliceStation policeStation = convertToEntity(policeStationDTO);
        PoliceStation savedPoliceStation = policeStationRepository.save(policeStation);
        return convertToDTO(savedPoliceStation);
    }

    @Override
    public PoliceStationDTO updatePoliceStation(Long id, PoliceStationDTO policeStationDTO) {
        if (!policeStationRepository.existsById(id)) {
            return null;
        }
        validateAddress(policeStationDTO.getAddress()); // Add validation here
        PoliceStation policeStation = convertToEntity(policeStationDTO);
        policeStation.setId(id);
        PoliceStation updatedPoliceStation = policeStationRepository.save(policeStation);
        return convertToDTO(updatedPoliceStation);
    }

    @Override
    public void deletePoliceStation(Long id) {
        policeStationRepository.deleteById(id);
    }

    private PoliceStationDTO convertToDTO(PoliceStation policeStation) {
        PoliceStationDTO dto = new PoliceStationDTO();
        dto.setId(policeStation.getId());
        dto.setStationName(policeStation.getStationName());
        dto.setLocation(policeStation.getLocation());
        dto.setContactNumber(policeStation.getContactNumber());
        dto.setAddress(convertToAddressDTO(policeStation.getAddress()));
        return dto;
    }

    private AddressDTO convertToAddressDTO(Address address) {
        if (address == null) {
            return null;
        }
        AddressDTO dto = new AddressDTO();
        dto.setAddressLine1(address.getAddressLine1());
        dto.setAddressLine2(address.getAddressLine2());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setPincode(address.getPincode());
        return dto;
    }

    private PoliceStation convertToEntity(PoliceStationDTO dto) {
        PoliceStation policeStation = new PoliceStation();
        policeStation.setStationName(dto.getStationName());
        policeStation.setLocation(dto.getLocation());
        policeStation.setContactNumber(dto.getContactNumber());
        policeStation.setAddress(convertToAddressEntity(dto.getAddress()));
        return policeStation;
    }

    private Address convertToAddressEntity(AddressDTO addressDTO) {
        if (addressDTO == null) {
            return null;
        }
        Address address = new Address();
        address.setAddressLine1(addressDTO.getAddressLine1());
        address.setAddressLine2(addressDTO.getAddressLine2());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setPincode(addressDTO.getPincode());
        return address;
    }

    private void validateAddress(AddressDTO addressDTO) {
        if (addressDTO == null || addressDTO.getPincode() == null) {
            throw new IllegalArgumentException("Address or pincode cannot be null");
        }
    }
}
