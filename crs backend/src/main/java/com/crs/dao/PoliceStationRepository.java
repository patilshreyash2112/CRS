package com.crs.dao;

import com.crs.entities.PoliceStation;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoliceStationRepository extends JpaRepository<PoliceStation, Long> {
	Optional<PoliceStation> findById(Long id);
}
