package com.platfrom.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.platfrom.model.Admin;
import com.platfrom.model.Product;
import com.platfrom.model.ProductCategory;
//import com.platfrom.model.ProductRequestDTO;
import com.platfrom.model.Vendor;
import com.platfrom.repository.AdminRepository;
import com.platfrom.repository.ProductRepository;
import com.platfrom.repository.ProductcategoryRepository;
import com.platfrom.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final VendorRepository vendorRepo;
    private final AdminRepository adminRepo;
    private final ProductcategoryRepository categoryRepo;
    private final ProductRepository productRepo;

    public List<Vendor> getUnapprovedVendors() {
        return vendorRepo.findByIsApprovedFalse();
    }

    public void approveVendor(Long vendorId) {
        Vendor vendor = vendorRepo.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setApproved(true);
        vendorRepo.save(vendor);

        // 🚀 TODO: Send credentials via email service
    }

    public ProductCategory createProductCategory(ProductCategory category, Long adminId) {
        Admin admin = adminRepo.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        category.setCreatedBy(admin);
        return categoryRepo.save(category);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepo.findByCategoryId(categoryId);
    }
    
    
    public Product addProductAsAdmin(Long categoryId, Long vendorId, Product product) {
        ProductCategory category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Vendor vendor = vendorRepo.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        product.setCategory(category);
        product.setVendor(vendor);
        return productRepo.save(product);
    }

    
    public List<ProductCategory> getAllCategories() {
        return categoryRepo.findAll();
    }
    
    public List<Product>getAllProducts(){
    	return productRepo.findAll();
    }



}

