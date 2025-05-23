package com.platfrom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.platfrom.model.CartItem;
import com.platfrom.model.CartRequest;
import com.platfrom.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users/cart")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CartController {

	@Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestParam Long userId,
                                            @RequestParam Long productId,
                                            @RequestParam int quantity) {
        cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.ok("Product added to cart");
    }

    @PostMapping("/add-multiple")
    public ResponseEntity<String> addMultipleProductsToCart(@RequestBody CartRequest request) {
        cartService.addMultipleProducts(request.getUserId(), request.getProducts());
        return ResponseEntity.ok("Products added to cart successfully!");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> viewCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
        return ResponseEntity.ok("Item removed from cart");
    }
}

