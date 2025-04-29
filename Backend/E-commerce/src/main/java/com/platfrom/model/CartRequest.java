package com.platfrom.model;

import java.util.List;

import lombok.Data;

@Data
public class CartRequest {
    private Long userId;
    private List<CartProductRequest> products;
}
