package com.platfrom.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.platfrom.model.Product;
import com.platfrom.model.Vendor;
import com.platfrom.repository.ProductRepository;
//import com.platfrom.model.VendorRegistrationDTO;
import com.platfrom.repository.VendorRepository;

@Service
public class VendorService {

	
	
	 @Autowired
	    private VendorRepository vendorRepository;
	 
	 @Autowired
	 private ProductRepository productRepository;
	 
	 public Vendor registerVendor(String name, String email, String phone, String password, MultipartFile file) throws IOException {
	        Vendor vendor = new Vendor();
	        vendor.setName(name);
	        vendor.setEmail(email);
	        vendor.setPhone(phone);
	        vendor.setPassword(password);
	        vendor.setBusinessLicense(file.getBytes());
	        vendor.setApproved(false);

	        return vendorRepository.save(vendor);
	    }

	    // Method to get vendor by id
	    public Optional<Vendor> getVendorById(Long id) {
	        return vendorRepository.findById(id);
	    }
	    
	 // Update vendor details
	    public boolean updateVendor(Long id, String name, String phone, String password) {
	        Optional<Vendor> optionalVendor = vendorRepository.findById(id);
	        if (optionalVendor.isPresent()) {
	            Vendor vendor = optionalVendor.get();
	            vendor.setName(name);
	            vendor.setPhone(phone);
	            vendor.setPassword(password);
	            vendorRepository.save(vendor);
	            return true;
	        }
	        return false;
	    }
	    
	    // deleteVendor 
	    public void deleteVendor(Long id) {
	        vendorRepository.deleteById(id);
	    }

	    // Get all vendors
	    public List<Vendor> getAllVendors() {
	        return vendorRepository.findAll();
	    }
	    
	    
	    public List<Product> getProductsByVendorId(Long vendorId) {
	        return productRepository.findByVendorId(vendorId);
	    }
}

