package com.crs.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private ComplaintType complaintType;

    private String complaintDescription;

    private LocalDateTime crimeDate;

    private String suspectName;

    private String suspectAddress;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "assigned_police_station_id", nullable = true)
    private PoliceStation assignedPoliceStation;

    @ManyToOne
    @JoinColumn(name = "assigned_police_officer_id", nullable = true)
    private PoliceOfficer assignedPoliceOfficer;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_name", nullable = false, columnDefinition = "varchar(50) default 'Pending'")
    private ComplaintStatus statusName = ComplaintStatus.PENDING;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "is_deleted", nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isDeleted = false;

    // Getters and Setters

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

    public ComplaintType getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(ComplaintType complaintType) {
        this.complaintType = complaintType;
    }

    public String getComplaintDescription() {
        return complaintDescription;
    }

    public void setComplaintDescription(String complaintDescription) {
        this.complaintDescription = complaintDescription;
    }

    public LocalDateTime getCrimeDate() {
        return crimeDate;
    }

    public void setCrimeDate(LocalDateTime crimeDate) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PoliceStation getAssignedPoliceStation() {
        return assignedPoliceStation;
    }

    public void setAssignedPoliceStation(PoliceStation assignedPoliceStation) {
        this.assignedPoliceStation = assignedPoliceStation;
    }

    public PoliceOfficer getAssignedPoliceOfficer() {
        return assignedPoliceOfficer;
    }

    public void setAssignedPoliceOfficer(PoliceOfficer assignedPoliceOfficer) {
        this.assignedPoliceOfficer = assignedPoliceOfficer;
    }

    public ComplaintStatus getStatusName() {
        return statusName;
    }

    public void setStatusName(ComplaintStatus statusName) {
        this.statusName = statusName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
