package com.crs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crs.dto.ContactInfoDTO;
import com.crs.service.ContactInfoService;

@RestController
@RequestMapping("/api/contactinfo")
public class ContactInfoController {

    @Autowired
    private ContactInfoService contactInfoService;
    
    @CrossOrigin
    @PostMapping
    public ResponseEntity<ContactInfoDTO> createContactInfo(@RequestBody ContactInfoDTO contactInfoDTO) {
        ContactInfoDTO createdContactInfo = contactInfoService.saveContactInfo(contactInfoDTO);
        return ResponseEntity.ok(createdContactInfo);
    }
    
    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<ContactInfoDTO>> getAllContactInfos() {
        List<ContactInfoDTO> contactInfos = contactInfoService.getAllContactInfos();
        return ResponseEntity.ok(contactInfos);
    }
}
