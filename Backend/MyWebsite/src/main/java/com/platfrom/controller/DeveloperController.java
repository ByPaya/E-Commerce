package com.platfrom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.platfrom.entity.Developer;
import com.platfrom.service.DeveloperService;

@RestController
@RequestMapping("/api/developers")
@CrossOrigin("*")
public class DeveloperController {

	
	@Autowired
    private DeveloperService developerService;

    @PostMapping
    public Developer addDeveloper(@RequestBody Developer developer) {
        return developerService.addDeveloper(developer);
    }

    @GetMapping("/available")
    public List<Developer> getAvailableDevelopers() {
        return developerService.getAllAvailableDevelopers();
    }

    @GetMapping
    public List<Developer> getAllDevelopers() {
        return developerService.getAllDevelopers();
    }
    
}
