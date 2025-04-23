package com.platfrom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platfrom.model.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long> {

//	
	List<Vendor> findByIsApprovedFalse();
//	boolean existsByEmail(String email);
	
}
