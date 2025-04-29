package com.platfrom.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor   
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private int stock;
//    private String imageUrl;
    @Lob  // Consider renaming to 'image_data' for clarity
    @Column( columnDefinition = "LONGBLOB")
    @JsonIgnore
    private byte[] imageUrl;

    @ManyToOne
     @JsonIgnore
    private Vendor vendor;

    @ManyToOne
    private ProductCategory category;

    @CreationTimestamp
    private LocalDateTime createdAt;
}

