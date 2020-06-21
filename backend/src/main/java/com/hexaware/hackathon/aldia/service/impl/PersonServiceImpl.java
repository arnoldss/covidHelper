package com.hexaware.hackathon.aldia.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hexaware.hackathon.aldia.domain.Person;
import com.hexaware.hackathon.aldia.repository.UserInfoRepository;

@Component
public class PersonServiceImpl implements PersonService{

	@Autowired
    private UserInfoRepository userInfoRepository;
	
	@Override
	public void setStatus(Person person) {
		// TODO Auto-generated method stub
		double result = 0.0;
		String status = "";
		double lastPay = person.getLastPayCheckIncome();
		if(lastPay>0 && lastPay<500)
			result = 10;
		else if(lastPay>500 && lastPay<1000)
			result = 8;
		else if(lastPay>1000 && lastPay<2000)
			result = 5;
		else if(lastPay>3000)
			result = 1;
		
		if(person.isSingle())
			result = result + 7;
		
		if(person.isPension())
			if(person.getPensionAmount()>1000 && person.getPensionAmount() <2000)
				result = result + 3;
			else if(person.getPensionAmount()>2000)
				result = result + 1;
		else if(!person.isPension())
			result = result + 10;
		
		if(!person.isFormalJob())
			result = result + 6;
		
		if(!person.isAnotherGovernmentProgram())
			result = result + 10;
		
		if(result<20)
			status ="rechazado";
		else
			status = "aprobado";
		if(result>20 && result <25)
			person.setAmountApproved(500);
		else if(result>25 && result <30)
			person.setAmountApproved(1000);
		else if(result>30 && result <35)
			person.setAmountApproved(1500);
		else 
			person.setAmountApproved(2000);
		
		person.setvBIPoints(result);
		person.setProgramStatus(status);
		
	}

}
