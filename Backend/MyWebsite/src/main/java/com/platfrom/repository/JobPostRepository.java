package com.platfrom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.platfrom.entity.JobPost;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long > {

}
