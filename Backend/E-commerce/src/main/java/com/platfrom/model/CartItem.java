package com.platfrom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor 
@AllArgsConstructor

public class CartItem {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private long id;
	 
	 @ManyToOne
	 @JsonIgnore
	 private User user;
	 
	 @ManyToOne
//	 @JsonIgnore
	 private Product product ;
	 
	 private int quantity;
	 
	 
}
