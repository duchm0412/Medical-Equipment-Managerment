package com.vti.repository;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vti.entity.Equipment;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Short>, JpaSpecificationExecutor<Equipment> {
	@Query("FROM Equipment e ORDER BY e.id ASC ")
	Page<Equipment> findAllCustom(Pageable pageable);

	Equipment findByEquipmentName(String name);

	Equipment findByEquipmentId(String id);

	public void deleteByEquipmentId(String id);

	@Query("FROM Equipment d where d.equipmentName like %?1%")
	ArrayList<Equipment> searchEquipment(String name);

	@Query("FROM Equipment d where d.equipmentId = ?1")
	ArrayList<Equipment> findByEquipmentIdCustom(String id);
	@Query("FROM Equipment e ORDER BY e.id ASC ")
	void findAllCustom1();

}
