//package com.platfrom.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.platfrom.model.Product;
//import com.platfrom.repository.ProductRepository;
//
//@Service
//public class ProductService {
// 
//	@Autowired
//	private ProductRepository prodRepository;
//	
//	public List<Product> getAllProducts()
//	{
//		return prodRepository.findAll();
//	}
//	
//}
package com.platfrom.service;

import com.platfrom.model.Product;
import com.platfrom.model.Vendor;
import com.platfrom.repository.ProductRepository;
import com.platfrom.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VendorRepository vendorRepository;

    // ✅ 1. Create or Add new Product
    public Product addProduct(Long vendorId, Product product) {
        Optional<Vendor> vendorOptional = vendorRepository.findById(vendorId);
        if (vendorOptional.isPresent()) {
            product.setVendor(vendorOptional.get());
            return productRepository.save(product);
        } else {
            throw new IllegalArgumentException("Vendor with ID " + vendorId + " not found.");
        }
    }

    // ✅ 2. Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ✅ 3. Get product by ID
    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    // ✅ 4. Update product
    public Product updateProduct(Long productId, Product updatedProduct) {
        Optional<Product> existingProductOpt = productRepository.findById(productId);
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setStock(updatedProduct.getStock());
            // update more fields as needed
            return productRepository.save(existingProduct);
        } else {
            throw new IllegalArgumentException("Product with ID " + productId + " not found.");
        }
    }

    // ✅ 5. Delete product
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    // ✅ 6. Get products by vendor ID
    public List<Product> getProductsByVendorId(Long vendorId) {
        return productRepository.findByVendorId(vendorId);
    }
}
