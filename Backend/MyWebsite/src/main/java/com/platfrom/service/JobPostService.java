package com.platfrom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platfrom.entity.JobPost;
import com.platfrom.repository.JobPostRepository;

@Service
public class JobPostService {

	 @Autowired
	 private JobPostRepository jobPostRepository;
	 
	 public JobPost addJobPost(JobPost jobPost) {
	        return jobPostRepository.save(jobPost);
	    }

	    public List<JobPost> getAllJobPosts() {
	        return jobPostRepository.findAll();
	    }

	    public JobPost getJobPostById(Long id) {
	        return jobPostRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("JobPost not found with id: " + id));
	    }

	    public void deleteJobPost(Long id) {
	        jobPostRepository.deleteById(id);
	    }
	
}
