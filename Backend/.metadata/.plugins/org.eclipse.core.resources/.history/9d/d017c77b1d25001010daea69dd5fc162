package com.platfrom.controller;

import java.io.IOException;
import java.util.Optional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.parameters.RequestBody;


import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Encoding;

import com.platfrom.model.Vendor;
//import com.platfrom.model.VendorRegistrationDTO;
import com.platfrom.repository.VendorRepository;
import com.platfrom.service.VendorService;

import java.io.ByteArrayInputStream;
import java.net.URLConnection;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin("*") // adjust for frontend
public class VendorController {
	@Autowired
    private VendorService vendorService;

	 @PostMapping("/upload")
	    public ResponseEntity<String> uploadVendorLicense(
	        @RequestParam("file") MultipartFile file,
	        @RequestParam("name") String name,
	        @RequestParam("email") String email,
	        @RequestParam("phone") String phone,
	        @RequestParam("password") String password
	    ) {
	        try {
	            vendorService.registerVendor(name, email, phone, password, file);
	            return ResponseEntity.ok("Vendor registered successfully!");
	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
	        }
	    }


    // Endpoint to get vendor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Vendor> getVendor(@PathVariable Long id) {
        Optional<Vendor> vendor = vendorService.getVendorById(id);
        return vendor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    
    @GetMapping("/license/{vendorId}")
    public ResponseEntity<byte[]> getVendorLicense(@PathVariable Long vendorId) {
        Optional<Vendor> vendorOptional = vendorService.getVendorById(vendorId);

        if (vendorOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Vendor vendor = vendorOptional.get();
        byte[] licenseData = vendor.getBusinessLicense();

        if (licenseData == null || licenseData.length == 0) {
            return ResponseEntity.noContent().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF); // or IMAGE_PNG, IMAGE_JPEG if it's an image
        headers.setContentDispositionFormData("attachment", "business_license.pdf");

        return new ResponseEntity<>(licenseData, headers, HttpStatus.OK);
    }

    
    

    
    
    
}

