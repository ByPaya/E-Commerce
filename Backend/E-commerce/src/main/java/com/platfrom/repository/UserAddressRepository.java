package com.platfrom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platfrom.model.UserAddress;

public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
	
	
}

