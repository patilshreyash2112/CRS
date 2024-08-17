package com.crs.service;

import java.util.List;

import com.crs.dto.ContactInfoDTO;

public interface ContactInfoService {
    ContactInfoDTO saveContactInfo(ContactInfoDTO contactInfoDTO);
    List<ContactInfoDTO> getAllContactInfos();
}
