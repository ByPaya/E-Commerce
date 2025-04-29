package com.platfrom.model;

import lombok.Data;

@Data
public class CartProductRequest {
    private Long productId;
    private int quantity;
}
