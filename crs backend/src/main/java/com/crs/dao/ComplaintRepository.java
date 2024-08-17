package com.crs.dao;

import com.crs.entities.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUserId(Long userId);
    List<Complaint> findByAssignedPoliceStationId(Long policeStationId);
    List<Complaint> findByStatusName(String statusName);
    List<Complaint> findByAssignedPoliceStationIdAndStatusName(Long policeStationId, String statusName);
}
