package com.platfrom.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.platfrom.model.Product;
import com.platfrom.model.ProductCategory;
//import com.platfrom.model.ProductRequestDTO;
import com.platfrom.model.Vendor;
import com.platfrom.repository.ProductRepository;
import com.platfrom.service.AdminService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {
    
	@Autowired
    private final AdminService adminService;
    
	@Autowired
   private final ProductRepository proRepository;   

    @GetMapping("/vendors/pending")
    public List<Vendor> getPendingVendors() {
        return adminService.getUnapprovedVendors();
    }

    @PostMapping("/vendors/approve/{vendorId}")
    public ResponseEntity<String> approveVendor(@PathVariable Long vendorId) {
        adminService.approveVendor(vendorId);
        return ResponseEntity.ok("Vendor approved and credentials sent.");
    }
     
 // Reject a vendor (delete the vendor record)
    @DeleteMapping("/vendors/reject/{vendorId}")
    public ResponseEntity<String> rejectVendor(@PathVariable Long vendorId) {
        boolean isDeleted = adminService.rejectVendor(vendorId);
        if (isDeleted) {
            return ResponseEntity.ok("Vendor rejected and deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Vendor not found.");
        }
    }
     
    
 //  Insert Category 
    @PostMapping("/categories")
    public ProductCategory createCategory(@RequestBody ProductCategory category, @RequestParam Long adminId) {
        return adminService.createProductCategory(category, adminId);
    }

 //  Update category
    @PutMapping("/categories/{categoryId}")
    public ResponseEntity<ProductCategory> updateCategory(@PathVariable Long categoryId, @RequestBody ProductCategory updatedCategory) {
        ProductCategory updated = adminService.updateCategory(categoryId, updatedCategory);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //  Delete category
    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        boolean deleted = adminService.deleteCategory(categoryId);
        if (deleted) {
            return ResponseEntity.ok("Category deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Category not found.");
        }
    }
    
    
    
//    @GetMapping("/categories/{categoryId}/products")
//    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
//        return adminService.getProductsByCategory(categoryId);
//    }
    
    @GetMapping("/categories/{categoryId}/products")
    public ResponseEntity<List<Map<String, Object>>> getProductsByCategory(@PathVariable Long categoryId) {
        List<Product> products = adminService.getProductsByCategory(categoryId);

        List<Map<String, Object>> productList = products.stream().map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("name", p.getName());
            map.put("description", p.getDescription());
            map.put("price", p.getPrice());
            map.put("stock", p.getStock());
            map.put("vendorName", p.getVendor() != null ? p.getVendor().getName() : null);
            map.put("categoryName", p.getCategory() != null ? p.getCategory().getName() : null);
            map.put("imageUrl", "/api/admin/product/" + p.getId() + "/image");
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(productList);
    }
    
    @GetMapping("/getAllProducts")
    public List<Map<String, Object>> getAllProducts() {
        List<Product> products = adminService.getAllProducts();

        return products.stream().map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("name", p.getName());
            map.put("description", p.getDescription());
            map.put("price", p.getPrice());
            map.put("stock", p.getStock());
            map.put("createdAt", p.getCreatedAt());
            map.put("vendorName", p.getVendor() != null ? p.getVendor().getName() : "N/A");
            map.put("categoryName", p.getCategory() != null ? p.getCategory().getName() : "N/A");
            map.put("imageUrl", "/api/admin/product/" + p.getId()+"/image"); // Image stream endpoint
            return map;
        }).collect(Collectors.toList());
    }

    
    @PostMapping("/categories/{categoryId}/products")
    public Product addProductByAdmin(
            @PathVariable Long categoryId,
            @RequestParam Long vendorId,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam int stock,
            @RequestPart("image") MultipartFile imageFile
    ) throws IOException {

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setImageUrl(imageFile.getBytes());

        return adminService.addProductAsAdmin(categoryId, vendorId, product);
    }
  //  Instead of storing images as byte[], use external storage services like AWS S3 or local directories for better scalability.
    
  
    
    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) {
        Product product =proRepository .findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        byte[] imageData = product.getImageUrl();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // or detect dynamically
        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
    }
     
    @GetMapping("/getCategories")
    public List<ProductCategory> getAllCategories() {
        return adminService.getAllCategories();
    }
    
    

//    @GetMapping("/getAllProducts")
//    public List<Product> getallProducts() {
//        return adminService.getAllProducts();
//    }
    

   
    
}
