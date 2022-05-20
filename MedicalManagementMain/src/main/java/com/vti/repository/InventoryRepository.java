package com.vti.repository;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vti.entity.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Short>, JpaSpecificationExecutor<Inventory> {
	@Query("FROM Inventory i ORDER BY i.id ASC ")
	Page<Inventory> findAllCustom(Pageable pageable);

	void deleteByEquipmentId(String employeeId);

	Inventory findByEquipmentId(String id);

	Inventory findByEquipmentName(String name);
	
	@Query("FROM Inventory d where d.equipmentName like %?1%")
	ArrayList<Inventory> searchInventory(String name);

}
