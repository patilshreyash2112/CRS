package com.crs.dto;

import com.crs.entities.Designation;
import com.crs.entities.PoliceStation;

public class PoliceOfficerDTO {
    
    private Long id;
    private String officerName;
    private Designation designation;
    private Long policeStationId;
    private String email;
    private String contactNumber;
    private boolean isDeleted;
    private String password;

    // Getters and Setters

    

	public Long getId() {
        return id;
    }

    public PoliceOfficerDTO(Long id, String officerName, Designation designation, Long policeStationId, String email,
			String contactNumber, boolean isDeleted, String password) {
		this.id = id;
		this.officerName = officerName;
		this.designation = designation;
		this.policeStationId = policeStationId;
		this.email = email;
		this.contactNumber = contactNumber;
		this.isDeleted = isDeleted;
		this.password = password;
	}

	public PoliceOfficerDTO(Long id, String officerName, String email, Designation designation,
			String contactNumber, Long policeStationId, boolean isDeleted) {
		this.id = id;
		this.officerName = officerName;
		this.designation = designation;
		this.policeStationId = policeStationId;
		this.email = email;
		this.contactNumber = contactNumber;
		this.isDeleted = isDeleted;
		
	}

	public PoliceOfficerDTO() {
		// TODO Auto-generated constructor stub
	}

	public void setId(Long id) {
        this.id = id;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
