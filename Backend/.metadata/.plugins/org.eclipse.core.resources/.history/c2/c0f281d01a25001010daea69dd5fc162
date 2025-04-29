//package com.platfrom.controller;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.platfrom.model.Product;
//import com.platfrom.model.ProductRequestDTO;
//import com.platfrom.service.ProductService;
//
//
//@RestController
//@RequestMapping("/api/product")
//@CrossOrigin("*")
//public class ProductController {
//	    @Autowired
//	    private ProductService productService;
//
//	    @GetMapping("/getAllProductse")
//	    public ResponseEntity<List<ProductRequestDTO>> getAllProducts() {
//	        List<Product> products = productService.getAllProducts();
//
//	        List<ProductRequestDTO> productDTOs = products.stream().map(p -> {
//	        	ProductRequestDTO dto = new ProductRequestDTO();
//	            dto.setId(p.getId());
//	            dto.setName(p.getName());
//	            dto.setDescription(p.getDescription());
//	            dto.setPrice(p.getPrice());
//	            dto.setStock(p.getStock());
//
//	            // Assuming you have an image endpoint like /product/{id}/image
//	            dto.setImageUrl("/api/admin/product/" + p.getId() + "/image");
//
//	            // Get vendor name (if vendor is not null)
//	            dto.setVendorName(p.getVendor() != null ? p.getVendor().getName() : "N/A");
//
//	            // Get category name (if category is not null)
//	            dto.setCategoryName(p.getCategory() != null ? p.getCategory().getName() : "N/A");
//
//	            return dto;
//	        }).collect(Collectors.toList());
//
//	        return ResponseEntity.ok(productDTOs);
//	    }
//	}
//
