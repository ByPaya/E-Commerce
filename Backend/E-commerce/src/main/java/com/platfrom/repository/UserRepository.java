package com.platfrom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.platfrom.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  
	
	Optional<User> findByEmail(String email);
    Optional<User> findByContact(String contact);
	
	
}
