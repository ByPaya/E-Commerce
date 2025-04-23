package com.platfrom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platfrom.model.Admin;
import com.platfrom.model.Product;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	

}
