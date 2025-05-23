package com.platfrom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platfrom.model.User;
import com.platfrom.repository.UserRepository;

@Service
public class UserServices {
	
	@Autowired
	private  UserRepository userRepo ;
	
	public User register(User user) {
		return userRepo.save(user);
			
	}
	
	public User login (String email, String password) {
		User user= userRepo.findByEmail(email)
				.orElseThrow(()-> new RuntimeException("Invalid email"));
		 if (!user.getPassword().equals(password)) {
	            throw new RuntimeException("Incorrect password");
	        }
	        return user;
	}

}
