package com.platfrom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platfrom.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
