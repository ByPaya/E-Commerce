package com.platfrom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platfrom.model.ProductCategory;

public interface ProductcategoryRepository extends JpaRepository<ProductCategory, Long> {

	
}
