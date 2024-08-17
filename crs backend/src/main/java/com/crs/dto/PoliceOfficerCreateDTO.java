package com.crs.dto;

import org.springframework.web.multipart.MultipartFile;

import com.crs.entities.Designation;

public class PoliceOfficerCreateDTO {

    private String officerName;
    private Designation designation;
    private Long policeStationId;
    private String contactNumber;
    private MultipartFile image;
	public String getOfficerName() {
		return officerName;
	}
	public void setOfficerName(String officerName) {
		this.officerName = officerName;
	}
	public Designation getDesignation() {
		return designation;
	}
	public void setDesignation(Designation designation) {
		this.designation = designation;
	}
	public Long getPoliceStationId() {
		return policeStationId;
	}
	public void setPoliceStationId(Long policeStationId) {
		this.policeStationId = policeStationId;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public MultipartFile getImage() {
		return image;
	}
	public void setImage(MultipartFile image) {
		this.image = image;
	}

    // Getters and Setters
    
    
}
