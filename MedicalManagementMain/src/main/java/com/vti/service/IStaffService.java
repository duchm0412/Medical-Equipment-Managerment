package com.vti.service;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.entity.Staff;

public interface IStaffService {

	Staff findByEmail(String email);

	Page<Staff> getAllStaff(Pageable pageable);

	Page<Staff> getByDepartmentId(Pageable pageable,String id);

	Staff createStaff(Staff staff);

	Staff existStaffById(String id);

	Staff existStaffByPhone(String phone);

	Staff updateStaff(Staff staff);

	void deleteStaff(String id);

	ArrayList<Staff> searchStaffByLikeName(String name);



//	Page<Staff> getAllStaffEWithDepartmentId(String id);

}
