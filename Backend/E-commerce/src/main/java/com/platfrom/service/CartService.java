package com.platfrom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platfrom.model.CartItem;
import com.platfrom.model.CartProductRequest;
import com.platfrom.model.Product;
import com.platfrom.model.User;
import com.platfrom.repository.CartRepository;
import com.platfrom.repository.ProductRepository;
import com.platfrom.repository.UserRepository;

@Service
public class CartService {

	@Autowired
	 private UserRepository userRepo;
	
	@Autowired
	private ProductRepository proRepo;
	
	@Autowired
	private CartRepository cartRepo;
	
	
	public void addToCart(Long userId , Long ProductId, int quantity) {
		User user = userRepo.findById(userId)
				.orElseThrow(()->new RuntimeException("User Not Found "));
		
		Product product = proRepo.findById(ProductId)
				.orElseThrow(()-> new RuntimeException("Product not Found "));
		
	     CartItem item = new CartItem();
	     item.setUser(user);
	     item.setProduct(product);
	     item.setQuantity(quantity);
	     
	     cartRepo.save(item);
		
	}
	
	public void addMultipleProducts(Long userId, List<CartProductRequest> products) {
        for (CartProductRequest p : products) {
            addToCart(userId, p.getProductId(), p.getQuantity());
        }
    }

    public List<CartItem> getCartByUser(Long userId) {
        return cartRepo.findByUserId(userId);
    }

    public void removeItem(Long itemId) {
        cartRepo.deleteById(itemId);
    }
	 
}
