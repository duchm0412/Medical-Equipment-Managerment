package com.vti.repository;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vti.entity.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Short>, JpaSpecificationExecutor<Department> {
	
	public Department findByDepartmentName(String name);

	public boolean existsByDepartmentName(String name);

	public void deleteByDepartmentId(String dpId);

	public Department findByDepartmentId(String id);
	
//	@Query("FROM Department d where d.departmentName like %?1%")
//	public Department searchDepartment(String name);
//	
	@Query("FROM Department d ORDER BY d.id ASC ")
	public Page<Department> findAllCustom(Specification<Department> build, Pageable pageable);
	@Query("FROM Department d where d.departmentName like %?1%")
	public ArrayList<Department> searchDepartment( String name);

}
