package com.vti.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.EquipOfDepart;




public interface IEquipOfDpRepository
		extends JpaRepository<EquipOfDepart, Short>, JpaSpecificationExecutor<EquipOfDepart> {

	ArrayList<EquipOfDepart> findByDepartmentId(String dpId);

	boolean deleteByEquipmentId(String id);
	
	

	ArrayList<EquipOfDepart> findAllByEquipmentId(String eId);

	void deleteByDepartmentId(String dId);
}
