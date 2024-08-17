package com.crs.entities;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Admin extends BaseEntity {

    @Column(name = "admin_name", nullable = false)
    private String adminName;

    // Getters and Setters
    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }
}
