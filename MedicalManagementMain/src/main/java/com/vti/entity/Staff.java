package com.vti.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "`Staff`")
public class Staff {
	private static final long serialVersionUID = 1L;
	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "`staffId`")
	private String staffId;

	@Column(name = "`fullName`")
	private String fullName;

	@Column(name = "`phone`")
	private String phone;

	@Column(name = "`email`")
	private String email;
	@Column(name = "`DepartmentID`")
	private String departmentId;

	@Column(name = "`role`")
	private String role;

	public Staff(int id, String staffId, String fullName, String phone, String email, String departmentId, String role) {
		super();
		this.id = id;
		this.staffId = staffId;
		this.fullName = fullName;
		this.phone = phone;
		this.email = email;
		this.departmentId =departmentId;
		this.role = role;
	}

	public Staff() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
