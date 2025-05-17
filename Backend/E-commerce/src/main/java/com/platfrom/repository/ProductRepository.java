package com.platfrom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platfrom.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
  
	List<Product> findByCategoryId(Long categoryId);
	List<Product> findAll();
	List<Product> findByVendorId(Long vendorId);
	
}
