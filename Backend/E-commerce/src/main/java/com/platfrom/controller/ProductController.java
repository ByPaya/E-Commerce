package com.platfrom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.platfrom.model.Product;
import com.platfrom.repository.ProductRepository;
import com.platfrom.service.AdminService;
import com.platfrom.service.ProductService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

	
	@Autowired
	private ProductService productService;

	@GetMapping("/{vendorId}/products")
	public ResponseEntity<List<Product>> getProductsByVendor(@PathVariable Long vendorId) {
	    return ResponseEntity.ok(productService.getProductsByVendorId(vendorId));
	}
	
	@PostMapping("/vendor/{vendorId}/add")
	public ResponseEntity<Product> addProduct(@PathVariable Long vendorId, @RequestBody Product product) {
	    return ResponseEntity.ok(productService.addProduct(vendorId, product));
	}

	@PutMapping("/{productId}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product product) {
	    return ResponseEntity.ok(productService.updateProduct(productId, product));
	}

	@DeleteMapping("/{productId}")
	public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
	    productService.deleteProduct(productId);
	    return ResponseEntity.ok("Product deleted successfully");
	}

	@GetMapping("/{productId}")
	public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
	    return productService.getProductById(productId)
	            .map(ResponseEntity::ok)
	            .orElse(ResponseEntity.notFound().build());
	}


}
