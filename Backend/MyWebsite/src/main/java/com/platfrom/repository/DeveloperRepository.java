package com.platfrom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.platfrom.entity.Developer;

public interface DeveloperRepository extends JpaRepository<Developer, Long> {

	List<Developer> findByAvailableTrue();
}
