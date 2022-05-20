package com.vti.service;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.entity.Department;
import com.vti.filter.DepartmentFilter;

public interface IDepartmentService {

	Page<Department> getAllDepartment(Pageable pageable, DepartmentFilter filter, String search);

	Department getDepartmentByID(String id);

	void createDepartment(Department entity);

	void deleteDepartment(String id);

	void updateDepartment(Department entity);

	Department findByDepartmentName(String name);

	boolean existByDepartmentName(String name);

	boolean existDepartmentByID(String id);

	ArrayList<Department> searchDepartmentByLikeName(String name);

}