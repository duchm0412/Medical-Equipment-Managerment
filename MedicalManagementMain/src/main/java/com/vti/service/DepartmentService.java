package com.vti.service;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vti.entity.Department;
import com.vti.filter.DepartmentFilter;
import com.vti.repository.DepartmentRepository;
import com.vti.specification.DepartmentSpecificationBuilder;

@Service
@Transactional
public class DepartmentService implements IDepartmentService {

	@Autowired
	private DepartmentRepository repository;

	// OK
	public Page<Department> getAllDepartment(Pageable pageable, DepartmentFilter filter, String search) {

		DepartmentSpecificationBuilder specification = new DepartmentSpecificationBuilder(filter, search);

		return repository.findAllCustom(specification.build(), pageable);
	}

	@Override
	public Department findByDepartmentName(String name) {
		return repository.findByDepartmentName(name);
	}

	// OK
	@Override
	public Department getDepartmentByID(String id) {
		return repository.findByDepartmentId(id);
	}

	// OK
	@Override
	public void createDepartment(Department entity) {
		repository.save(entity);

	}

	// ERROR
	@Transactional
	@Override
	public void deleteDepartment(String id) {
		repository.deleteByDepartmentId(id);

	}

	@Override
	public void updateDepartment(Department entity) {
		Department dp = repository.findByDepartmentId(entity.getDepartmentId());
		if (entity.getDepartmentName() != null) {
			dp.setDepartmentName(entity.getDepartmentName());
		}
		if (entity.getDescription() != null) {
			dp.setDescription(entity.getDescription());
		}

		if (entity.getManager() != null) {
			dp.setManager(entity.getManager() );
		}

		if (entity.getStatus() != null) {
			dp.setStatus(entity.getStatus());
		}

		repository.save(dp);

	}

	@Override
	public boolean existByDepartmentName(String name) {
		Department dp = repository.findByDepartmentName(name);
		if (dp != null) {
			return true;
		}
		return false;
	}

	@Override
	public boolean existDepartmentByID(String id) {
		Department dp = repository.findByDepartmentId(id);
		if (dp != null) {
			return true;
		}
		return false;
	}

	

	@Override
	public ArrayList<Department> searchDepartmentByLikeName(String name) {
		ArrayList<Department> dp = repository.searchDepartment( name);
		return dp;
	}

}
