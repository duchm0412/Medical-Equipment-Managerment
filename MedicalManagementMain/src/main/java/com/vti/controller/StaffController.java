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
import org.springframework.web.bind.annotation.RestController;

import com.vti.entity.Staff;
import com.vti.service.IStaffService;

@RestController
@RequestMapping(value = "api/v1/staffs")
public class StaffController {
	@Autowired
	private IStaffService service;

	@GetMapping(value = "/{email}")
	public ResponseEntity<?> findByEmail(@PathVariable(name = "email") String email) {
		Staff sta = service.findByEmail(email);
		return new ResponseEntity<>(sta, HttpStatus.OK);
	}

	// Tìm kiếm tất cả nhân viên sử dụng với pageable
	@GetMapping()
	public ResponseEntity<?> getAllStaff(Pageable pageable) {
		Page<Staff> entities = service.getAllStaff(pageable);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

	// Tìm nhân viên bằng phòng ban của nhân viên đó
	@GetMapping(value = "/departmentId/{departmentId}")
	public ResponseEntity<?> getByDepartmentId(Pageable pageable, @PathVariable(name = "departmentId") String id) {
		Page<Staff> entities = service.getByDepartmentId(pageable, id);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

	// Kiểm tra tồn tại nhân viên qua id
	@GetMapping(value = "/staffId/{staffId}")
	public ResponseEntity<?> existStaffById(@PathVariable(name = "staffId") String id) {
		Staff staff = service.existStaffById(id);

		return new ResponseEntity<>(staff, HttpStatus.OK);
	}

	// Kiểm tra tồn tại nhân viên qua số điện thoại
	@GetMapping(value = "/phone/{phone}")
	public ResponseEntity<?> existStaffByPhone(@PathVariable(name = "phone") String phone) {
		Staff staff = service.existStaffByPhone(phone);

		return new ResponseEntity<>(staff, HttpStatus.OK);
	}

	// Tạo mới nhân viên
	@PostMapping
	public ResponseEntity<?> createStaff(@RequestBody Staff staff) {
		Staff staff0 = service.createStaff(staff);
		if (staff0 == null) {
			return new ResponseEntity<>("Tạo mới nhân viên thất bại ", HttpStatus.OK);
		}
		return new ResponseEntity<>("Tạo mới nhân viên thành công", HttpStatus.OK);
	}

	// Cập nhật nhân viên
	@PutMapping
	public ResponseEntity<?> updateStaff(@RequestBody Staff staff) {
		Staff staff0 = service.updateStaff(staff);
		if (staff0 == null) {
			return new ResponseEntity<>("false", HttpStatus.OK);
		}
		return new ResponseEntity<>("success", HttpStatus.OK);
	}

	// Xóa nhân viên bằng id
	@DeleteMapping(value = "/staffId/{staffId}")
	public ResponseEntity<?> deleteStaff(@PathVariable(name = "staffId") String staffId) {
		service.deleteStaff(staffId);
		return new ResponseEntity<String>("success", HttpStatus.OK);

	}

	@GetMapping(value = "/likename/{name}")
	public ResponseEntity<?> searchStaffByLikeName(@PathVariable(name = "name") String name) {
		ArrayList<Staff> dp = service.searchStaffByLikeName(name);
		return new ResponseEntity<>(dp, HttpStatus.OK);
	}

}
