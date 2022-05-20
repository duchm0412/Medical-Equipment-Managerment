package com.vti.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.DepartmentFormForCreating;
import com.vti.dto.DepartmentFormForUpdating;
import com.vti.entity.Department;
import com.vti.filter.DepartmentFilter;
import com.vti.service.IDepartmentService;

@RestController
@RequestMapping(value = "api/v1/departments")
public class DepartmentController {

	@Autowired
	private IDepartmentService service;

	// Method này đã sử dụng với pageable
	@GetMapping()
	public ResponseEntity<?> getAllDepartment(Pageable pageable, DepartmentFilter filter,
			@RequestParam(required = false) String search) {
		Page<Department> entities = service.getAllDepartment(pageable, filter, search);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

	// Test OK
	@GetMapping(value = "/name/{name}")
	public ResponseEntity<?> findByDepartmentName(@PathVariable(name = "name") String name) {
		Department dp = service.findByDepartmentName(name);
		return new ResponseEntity<>(dp, HttpStatus.OK);
	}

	@GetMapping(value = "/checkname/{name}")
	public ResponseEntity<?> existByDepartmentName(@PathVariable(name = "name") String name) {
		boolean b = service.existByDepartmentName(name);
		return new ResponseEntity<>(b, HttpStatus.OK);

	}

	// Test OK
	@PostMapping()
	public ResponseEntity<?> createDepartment(@RequestBody DepartmentFormForCreating form) {
		service.createDepartment(form.toEntity());
		return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
	}

	// Test OK
	@GetMapping(value = "/id/{id}")
	public ResponseEntity<?> getDepartmentByID(@PathVariable(name = "id") String id) {
		Department dp = service.getDepartmentByID(id);
		return new ResponseEntity<>(dp, HttpStatus.OK);
	}
	@GetMapping(value = "/checkid/{id}")
	public ResponseEntity<?> existDepartmentByID(@PathVariable(name = "id") String id) {
		boolean b  = service.existDepartmentByID(id);
		return new ResponseEntity<>(b, HttpStatus.OK);
	}

	// Test OK
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> deleteDepartment(@PathVariable(name = "id") String id) {
		service.deleteDepartment(id);
		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
	}
	
	@GetMapping(value = "/likename/{name}")
	public ResponseEntity<?> searchDepartmentByLikeName(@PathVariable(name = "name") String name) {
		ArrayList<Department> dp = service.searchDepartmentByLikeName(name);
		return new ResponseEntity<>(dp, HttpStatus.OK);
	}
	@PutMapping
	public ResponseEntity<?> updateGroup(@RequestBody DepartmentFormForUpdating form) {
		service.updateDepartment(form.toEntity());
		return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
	}
}
