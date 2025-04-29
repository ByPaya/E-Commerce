package com.platfrom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platfrom.model.OrderItem;

public interface OrderItemRepository  extends JpaRepository<OrderItem, Long> {

}
