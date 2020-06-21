package com.hexaware.hackathon.aldia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.hackathon.aldia.domain.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person,Integer>{
	
    Boolean existsByCurp(String curp);
	Person findByName(String name);
	Person findByCurp(String curp);
	
}
