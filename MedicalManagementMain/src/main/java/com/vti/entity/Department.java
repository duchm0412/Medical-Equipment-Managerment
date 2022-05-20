package com.vti.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "`Department`")
public class Department implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private short id;

	@Column(name = "`DepartmentID`", length = 50, nullable = false, unique = true)
	private String departmentId;

	@Column(name = "`DepartmentName`", length = 50, nullable = false, unique = true)
	private String departmentName;

	@Column(name = "`description`", length = 50, nullable = false, unique = true)
	private String description;
	
	@Column(name = "`Manager`", length = 50, nullable = false, unique = true)
	private String manager;

	@Column(name = "`status`", nullable = false)
	private String status = "Sẵn sàng";

	

	public Department(short id, String departmentID, String departmentName, String description,String manager, String status) {
		super();
		this.id=id;
		this.departmentId = departmentID;
		this.departmentName = departmentName;
		this.description = description;
		this.manager = manager;
		this.status = status;
	}

	
	public Department(String departmentId, String departmentName, String description,String manager, String status) {
		super();
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.description = description;
		this.manager =manager;
		this.status = status;
	}


	public Department() {
		super();
	}


	public short getId() {
		return id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getManager() {
		return manager;
	}


	public void setManager(String manager) {
		this.manager = manager;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

}
