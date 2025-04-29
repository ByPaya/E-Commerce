package com.platfrom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.platfrom.model.CartItem;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {

	List<CartItem> findByUserId(Long userId);
	
	
}
