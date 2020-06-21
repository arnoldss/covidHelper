package com.hexaware.hackathon.aldia.domain;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.util.Date;

import javax.persistence.Column;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class Person {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="person_id")
	private int id;
	private String curp;
	private String name;
	
	@Column(name="celular_phone")
	private String celularPhone;
	
	@Column(name="DOB")
	private Date dob;
	
	@Column(name="formal_job") 
	private boolean formalJob;
	
	@Column(name="last_paycheck_income")
	private double lastPayCheckIncome;
	
	@Column(name="another_government_program")
	private boolean anotherGovernmentProgram;
	
	@Column(name="single")
	private boolean single;

	@Column(name="pension")
	private boolean pension;
	
	@Column(name="pension_amount")
	private double pensionAmount;
	
	@Column(name="VBIPoints")
	private double vBIPoints;
	
	@Column(name="account_number")
	private String accountNumber;
	
	@Column(name="clabe")
	private String clabe;
	
	@Column(name="tarjeta")
	private String tarjeta;
	
	@Column(name="bank")
	private String bank;
	
	@Column(name="program_status")
	private String programStatus;
	
	@ManyToOne(optional = true, fetch = FetchType.EAGER)
    private UserInfo user;
	
	@Column(name="amount_approved")
	private double amountApproved;
	
	public String getCurp() {
		return curp;
	}
	public void setCurp(String curp) {
		this.curp = curp;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Person(String curp, String name) {
		super();
		this.curp = curp;
		this.name = name;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCelularPhone() {
		return celularPhone;
	}
	public void setCelularPhone(String celularPhone) {
		this.celularPhone = celularPhone;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public boolean isFormalJob() {
		return formalJob;
	}
	public void setFormalJob(boolean formalJob) {
		this.formalJob = formalJob;
	}
	public double getLastPayCheckIncome() {
		return lastPayCheckIncome;
	}
	public void setLastPayCheckIncome(double lastPayCheckIncome) {
		this.lastPayCheckIncome = lastPayCheckIncome;
	}
	public boolean isAnotherGovernmentProgram() {
		return anotherGovernmentProgram;
	}
	public void setAnotherGovernmentProgram(boolean anotherGovernmentProgram) {
		this.anotherGovernmentProgram = anotherGovernmentProgram;
	}
	public boolean isSingle() {
		return single;
	}
	public void setSingle(boolean single) {
		this.single = single;
	}
	public boolean isPension() {
		return pension;
	}
	public void setPension(boolean pension) {
		this.pension = pension;
	}
	public double getPensionAmount() {
		return pensionAmount;
	}
	public void setPensionAmount(double pensionAmount) {
		this.pensionAmount = pensionAmount;
	}

	public double getvBIPoints() {
		return vBIPoints;
	}
	public void setvBIPoints(double vBIPoints) {
		this.vBIPoints = vBIPoints;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getClabe() {
		return clabe;
	}
	public void setClabe(String clabe) {
		this.clabe = clabe;
	}
	public String getTarjeta() {
		return tarjeta;
	}
	public void setTarjeta(String tarjeta) {
		this.tarjeta = tarjeta;
	}
	public String getBank() {
		return bank;
	}
	public double getAmountApproved() {
		return amountApproved;
	}
	public void setAmountApproved(double amountApproved) {
		this.amountApproved = amountApproved;
	}
	public void setBank(String bank) {
		this.bank = bank;
	}
	public String getProgramStatus() {
		return programStatus;
	}
	public void setProgramStatus(String programStatus) {
		this.programStatus = programStatus;
	}
	
 
	public UserInfo getUser() {
		return user;
	}
	public void setUser(UserInfo user) {
		this.user = user;
	}
	
	public Person() {}
	
}
