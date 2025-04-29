package com.platfrom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.platfrom.model.Address;
import com.platfrom.model.Order;
import com.platfrom.service.OrderService;

@RestController
@RequestMapping("/api/users/orders")
@CrossOrigin("*")
public class OrderController {

	@Autowired
    private  OrderService orderService;

    @PostMapping("/place/{userId}")
    public ResponseEntity<Order> placeOrder(
            @PathVariable Long userId,
            @RequestBody Address address) {
        return ResponseEntity.ok(orderService.placeOrder(userId, address));
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }
}

