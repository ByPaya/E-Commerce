package com.platfrom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.platfrom.entity.JobPost;
import com.platfrom.service.JobPostService;

@RestController
@RequestMapping("/api/jobposts")
@CrossOrigin("*")

public class JobPostController {
 
	@Autowired
	private JobPostService jobService ;
	
	
	@PostMapping
	public JobPost createJobPost (@RequestBody JobPost jobPost) {
		  
		return jobService.addJobPost(jobPost);
		
	}
		
	@GetMapping
	public List<JobPost> getAllJob(){
		return jobService.getAllJobPosts();
	}
	
	@GetMapping("/{id}")
    public JobPost getJobPost(@PathVariable Long id) {
        return jobService.getJobPostById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteJobPost(@PathVariable Long id) {
        jobService.deleteJobPost(id);
        return "JobPost deleted successfully!";
    }
		
}
	
	
