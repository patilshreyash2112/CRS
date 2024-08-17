package com.crs.dao;

import com.crs.entities.PoliceOfficer;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoliceOfficerRepository extends JpaRepository<PoliceOfficer, Long> {
	Optional<PoliceOfficer> findById(Long id);
	List<PoliceOfficer> findByPoliceStationId(Long stationId);
	PoliceOfficer findByEmail(String email);
}
