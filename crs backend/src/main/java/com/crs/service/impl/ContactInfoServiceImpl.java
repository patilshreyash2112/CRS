package com.crs.service.impl;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crs.dao.ContactInfoRepository;
import com.crs.dto.ContactInfoDTO;
import com.crs.entities.ContactInfo;
import com.crs.service.ContactInfoService;

@Service
public class ContactInfoServiceImpl implements ContactInfoService {

    @Autowired
    private ContactInfoRepository contactInfoRepository;
    
    @Override
    public List<ContactInfoDTO> getAllContactInfos() {
        return contactInfoRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public ContactInfoDTO saveContactInfo(ContactInfoDTO contactInfoDTO) {
        ContactInfo contactInfo = new ContactInfo();
        contactInfo.setFirstName(contactInfoDTO.getFirstName());
        contactInfo.setLastName(contactInfoDTO.getLastName());
        contactInfo.setContactNumber(contactInfoDTO.getContactNumber());
        contactInfo.setEmailAddress(contactInfoDTO.getEmailAddress());
        contactInfo.setReasonOfContact(contactInfoDTO.getReasonOfContact());

        contactInfo = contactInfoRepository.save(contactInfo);

        contactInfoDTO.setId(contactInfo.getId());
        return contactInfoDTO;
    }
    
    private ContactInfoDTO convertToDTO(ContactInfo contactInfo) {
        ContactInfoDTO dto = new ContactInfoDTO();
        dto.setId(contactInfo.getId());
        dto.setFirstName(contactInfo.getFirstName());
        dto.setLastName(contactInfo.getLastName());
        dto.setContactNumber(contactInfo.getContactNumber());
        dto.setEmailAddress(contactInfo.getEmailAddress());
        dto.setReasonOfContact(contactInfo.getReasonOfContact());
        return dto;
    }
}
