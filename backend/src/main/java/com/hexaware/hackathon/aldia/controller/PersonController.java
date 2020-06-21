package com.hexaware.hackathon.aldia.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.hexaware.hackathon.aldia.domain.Person;
import com.hexaware.hackathon.aldia.domain.UserInfo;
import com.hexaware.hackathon.aldia.exception.ValidationException;
import com.hexaware.hackathon.aldia.repository.PersonRepository;
import com.hexaware.hackathon.aldia.repository.UserInfoRepository;
import com.hexaware.hackathon.aldia.service.impl.PersonServiceImpl;

import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@CrossOrigin
public class PersonController {

	@Autowired
	PersonRepository personRepository;

	@Autowired
    private UserInfoRepository userInfoRepository;

	@Autowired
	private PersonServiceImpl personServiceImpl;

	@PostMapping("/person")
	public Boolean create(@RequestBody Map<String, String> body) {
		String curp = body.get("curp");
		if(personRepository.existsByCurp(curp)) {
			throw new ValidationException("Person already existed");
		}
		convert(body);
		return true;
	}

	private void convert(Map<String, String> body) {
		final ObjectMapper mapper = new ObjectMapper();
		Person person = mapper.convertValue(body, Person.class);
		UserInfo user = userInfoRepository.findById(Integer.valueOf(body.get("userId"))).get();
		person.setUser(user);
		personServiceImpl.setStatus(person);
		personRepository.save(person);
	}

	@GetMapping("/person")
	public ResponseEntity<List<Person>> read() {
		return ResponseEntity.ok(parseResponse(personRepository.findAll()));
  }

  @GetMapping("/personByCurp")
	public ResponseEntity<Person> readByCurp(@RequestParam(name = "curp") String curp) {
    Person person = personRepository.findByCurp(curp);
    int id = person.getId();
		return ResponseEntity.ok(personRepository.findById(id).get());
	}

	private List<Person> parseResponse(List<Person> list){
		for (Person element : list) {
		    UserInfo user = new UserInfo();
		    user.setPassword(null);
		    if(element.getUser()!= null)
		    	element.getUser().setPassword(null);
		}
		return list;
	}

	@PatchMapping("/person")
	public Boolean update(@RequestBody Map<String, String> body) {
		convert(body);
		return true;
	}

	@DeleteMapping("/person")
	public Boolean delete(@RequestParam(name = "id") int id) {
		personRepository.delete(personRepository.findById(id).get());
		return true;
	}

	@GetMapping("/program/status")
	public ResponseEntity<Map<String,Object>> status(@RequestParam(name = "curp") String curp) {
		Person person = personRepository.findByCurp(curp);
        Map<String, Object> map = new HashMap<>();
        map.put("status", person.getProgramStatus());
        map.put("amount", person.getAmountApproved());
		return ResponseEntity.ok(map);
	}

}
