package com.platfrom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platfrom.entity.Developer;
import com.platfrom.repository.DeveloperRepository;

@Service
public class DeveloperService {

	@Autowired
    private DeveloperRepository developerRepository;

    public Developer addDeveloper(Developer developer) {
        return developerRepository.save(developer);
    }

    public List<Developer> getAllAvailableDevelopers() {
        return developerRepository.findByAvailableTrue();
    }

    public List<Developer> getAllDevelopers() {
        return developerRepository.findAll();
    }
	
}
