package com.vti.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vti.entity.Staff;
import com.vti.repository.StaffRepository;

@Service
public class StaffService implements IStaffService{
	@Autowired
	private StaffRepository repository;

	@Override
	public Staff findByEmail(String id) {
		Staff sta = repository.findByEmailCustom(id);
		return sta;
	}

	@Override
	public Page<Staff> getAllStaff(Pageable pageable) {
		return repository.findAllCustom(pageable);
	}

	@Override
	public Page<Staff> getByDepartmentId(Pageable pageable, String id) {
		return repository.findByDepartmentId(pageable, id);
	}

	@Override
	public Staff createStaff(Staff staff) {
		return repository.save(staff);
	}

	@Override
	public Staff existStaffById(String id) {
		return repository.findByStaffId(id);
	}

	@Override
	public Staff existStaffByPhone(String phone) {
		return repository.findByPhone(phone);
	}

	@Override
	public Staff updateStaff(Staff staff) {
		Staff staff0 = repository.findByStaffId(staff.getStaffId());
		if (staff.getFullName() != null) {
			staff0.setFullName(staff.getFullName());
		}
		if (staff.getPhone() != null) {
			staff0.setPhone(staff.getPhone() );
		}
		if (staff.getEmail() != null) {
			staff0.setEmail(staff.getEmail());
		}
		if (staff.getDepartmentId() != null) {
			staff0.setDepartmentId(staff.getDepartmentId());
		}
		if (staff.getRole() != null) {
			staff0.setRole(staff.getRole());
		}
		repository.save(staff0);
		return staff0;

	}

	@Override
	public void deleteStaff(String staffId) {
		Staff staff = repository.findByStaffId(staffId);
		repository.delete(staff);
		
		
	}

	@Override
	public ArrayList<Staff> searchStaffByLikeName(String name) {
		ArrayList<Staff> dp = repository.searchStaff(name);
		return dp;
	}
	 
}
