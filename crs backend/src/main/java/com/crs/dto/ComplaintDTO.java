package com.crs.dto;

import java.time.LocalDate;

public class ComplaintDTO {
    private Long id;
    private String title;
    private String complaintType;
    private String complaintDescription;
    private LocalDate crimeDate;
    private String suspectName;
    private String suspectAddress;
    private Long userId;
    private Long assignedPoliceStationId;
    private Long assignedPoliceOfficerId;
    private String statusName;
    private boolean isDeleted;
            
	public ComplaintDTO(Long id, String title, String complaintType, String complaintDescription, LocalDate crimeDate,
			String suspectName, String suspectAddress, Long userId, Long assignedPoliceStationId,
			Long assignedPoliceOfficerId, String statusName, boolean isDeleted) {
		super();
		this.id = id;
		this.title = title;
		this.complaintType = complaintType;
		this.complaintDescription = complaintDescription;
		this.crimeDate = crimeDate;
		this.suspectName = suspectName;
		this.suspectAddress = suspectAddress;
		this.userId = userId;
		this.assignedPoliceStationId = assignedPoliceStationId;
		this.assignedPoliceOfficerId = assignedPoliceOfficerId;
		this.statusName = statusName;
		this.isDeleted = isDeleted;
	}
		
	public ComplaintDTO() {
		
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getComplaintType() {
		return complaintType;
	}
	public void setComplaintType(String complaintType) {
		this.complaintType = complaintType;
	}
	public String getComplaintDescription() {
		return complaintDescription;
	}
	public void setComplaintDescription(String complaintDescription) {
		this.complaintDescription = complaintDescription;
	}
	public LocalDate getCrimeDate() {
		return crimeDate;
	}
	public void setCrimeDate(LocalDate crimeDate) {
		this.crimeDate = crimeDate;
	}
	public String getSuspectName() {
		return suspectName;
	}
	public void setSuspectName(String suspectName) {
		this.suspectName = suspectName;
	}
	public String getSuspectAddress() {
		return suspectAddress;
	}
	public void setSuspectAddress(String suspectAddress) {
		this.suspectAddress = suspectAddress;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getAssignedPoliceStationId() {
		return assignedPoliceStationId;
	}
	public void setAssignedPoliceStationId(Long assignedPoliceStationId) {
		this.assignedPoliceStationId = assignedPoliceStationId;
	}
	public Long getAssignedPoliceOfficerId() {
		return assignedPoliceOfficerId;
	}
	public void setAssignedPoliceOfficerId(Long assignedPoliceOfficerId) {
		this.assignedPoliceOfficerId = assignedPoliceOfficerId;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public boolean getIsDeleted() {
		return isDeleted;
	}
	public void setIsDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

    // Getters and Setters
    
}
