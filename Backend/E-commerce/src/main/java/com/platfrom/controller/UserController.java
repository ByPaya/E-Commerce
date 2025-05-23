package com.platfrom.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.platfrom.model.User;
import com.platfrom.service.UserServices;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserServices userservice;
	
	
	@PostMapping("/register")
	public ResponseEntity<User> register (@RequestBody User user){
		  return ResponseEntity.ok(userservice.register(user));
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> login ( @RequestBody Map<String , String> loginData){
		return ResponseEntity.ok(userservice.login(loginData.get("email"), loginData.get("password")));
	}
	

}
