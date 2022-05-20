package com.vti.repository;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vti.entity.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Short>, JpaSpecificationExecutor<Staff> {
	@Query("FROM Staff s WHERE s.email = ?1")
	Staff findByEmailCustom(String email);

	@Query("FROM Staff s ORDER BY s.id ASC")
	Page<Staff> findAllCustom(Pageable pageable);

	Page<Staff> findByDepartmentId(Pageable pageable, String id);

	Staff findByStaffId(String id);

	Staff findByPhone(String phone);

	void deleteByStaffId(String id);

	@Query("FROM Staff d where d.fullName like %?1%")
	ArrayList<Staff> searchStaff(String name);

}
