package com.platfrom.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platfrom.model.Address;
import com.platfrom.model.CartItem;
import com.platfrom.model.Order;
import com.platfrom.model.OrderItem;
import com.platfrom.model.Product;
import com.platfrom.model.User;
import com.platfrom.repository.AddressRepository;
import com.platfrom.repository.CartRepository;
import com.platfrom.repository.OrderRepository;
import com.platfrom.repository.ProductRepository;
import com.platfrom.repository.UserRepository;
//
//@Service
//
//public class OrderService {
//
//	@Autowired
//    private  OrderRepository orderRepo;
//	
//	@Autowired
//    private  ProductRepository productRepo;
//	
//	@Autowired
//    private  CartRepository cartRepo;
//
//    public Order placeOrder(Long userId, Address address) {
//        List<CartItem> cartItems = cartRepo.findByUserId(userId);
//
//        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");
//
//        double total = 0.0;
//        List<OrderItem> orderItems = new ArrayList<OrderItem>();
//
//        Order order = new Order();
//        order.setUser(cartItems.get(0).getUser());
//        order.setOrderDate(LocalDateTime.now());
//        order.setDeliveryStatus("UNPLACED");
//        order.setPaymentStatus("PAID");
//        order.setDeliveryAddress(address);
//
//        for (CartItem cart : cartItems) {
//            Product p = cart.getProduct();
//
//            OrderItem oi = new OrderItem();
//            oi.setOrder(order);
//            oi.setProduct(p);
//            oi.setPrice(p.getPrice());
//            oi.setPrice(p.getPrice());
//            oi.setQuantity(cart.getQuantity());
//            orderItems.add(oi);
//
//            total += p.getPrice() * cart.getQuantity();
//        }
//
//        order.setItems(orderItems);
//        order.setTotalAmount(total);
//
//        cartRepo.deleteAll(cartItems); // clear cart after placing order
//
//        return orderRepo.save(order);
//    }
//
//    public List<Order> getUserOrders(Long userId) {
//        return orderRepo.findByUserId(userId);
//    }
//}


@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order placeOrder(Long userId, Address address) {
        // 1. Get user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Set user inside address
        address.setUser(user);

        // 3. Save address first
        Address savedAddress = addressRepository.save(address);

        // 4. Get cart items for the user
        List<CartItem> cartItems = cartRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // 5. Create Order
        Order order = new Order();
        order.setUser(user);
        order.setDeliveryAddress(savedAddress);  // Important: use saved address
        order.setOrderDate(LocalDateTime.now());
        order.setDeliveryStatus("PLACED");  // Default order status
        order.setTotalAmount(0.0);  // Initialize total amount

        // 6. Process cart items and calculate total amount
        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;
        for (CartItem cartItem : cartItems) {
            Product product = productRepository.findById(cartItem.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

            // Create OrderItem for each CartItem
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setPrice(product.getPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItems.add(orderItem);

            // Add price * quantity to the total order amount
            totalAmount += product.getPrice() * cartItem.getQuantity();
        }

        // 7. Set the total amount and order items
        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        // 8. Save the order
        Order savedOrder = orderRepository.save(order);

        // 9. Clear cart after order is placed
        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}

