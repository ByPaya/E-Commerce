package com.platfrom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.platfrom.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
	
	
}

