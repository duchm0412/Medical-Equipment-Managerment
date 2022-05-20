package com.vti.dto;

import com.vti.entity.Department;

public class DepartmentFormForUpdating {
	private String departmentId;
	private String description;
	private String departmentName;
	private String manager;
	private String status;

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
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

	public Department toEntity() {
		return new Department(departmentId, departmentName, description,manager, status);
	}
}
