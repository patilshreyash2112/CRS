package com.crs.service;

import com.crs.entities.Complaint;
import com.crs.dto.ComplaintDTO;
import java.util.List;

public interface ComplaintService {
    ComplaintDTO createComplaint(ComplaintDTO complaintDTO);
    ComplaintDTO getComplaintById(Long id);
    List<ComplaintDTO> getAllComplaints();
    List<ComplaintDTO> getAllComplaintsByPoliceStation(Long policeStationId);
    List<ComplaintDTO> getAllPendingComplaints();
    List<ComplaintDTO> getAllPendingComplaintsByPoliceStation(Long policeStationId);
    List<ComplaintDTO> getAllAssignedComplaints();
    List<ComplaintDTO> getAllAssignedComplaintsByPoliceStation(Long policeStationId);
    List<ComplaintDTO> getComplaintsByUser(Long userId);
    void deleteComplaint(Long id);
	ComplaintDTO updateComplaint(Long id, ComplaintDTO complaintDTO);
}
