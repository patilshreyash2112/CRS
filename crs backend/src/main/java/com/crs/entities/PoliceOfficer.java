package com.crs.entities;

import javax.persistence.*;

@Entity
@Table(name = "police_officers")
public class PoliceOfficer extends BaseEntity {

    @Column(name = "officer_name", nullable = false)
    private String officerName;

    @Enumerated(EnumType.STRING)
    @Column(name = "designation", nullable = false)
    private Designation designation;

    @ManyToOne
    @JoinColumn(name = "police_station_id", nullable = false)
    private PoliceStation policeStation;  // Foreign key to PoliceStation entity

    // Getters and Setters
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

    public PoliceStation getPoliceStation() {
        return policeStation;
    }

    public void setPoliceStation(PoliceStation long1) {
        this.policeStation = long1;
    }
}
