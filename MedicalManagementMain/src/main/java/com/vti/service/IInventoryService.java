package com.vti.service;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.dto.ChangeQuantityInInventory;
import com.vti.entity.Inventory;

public interface IInventoryService {

	Page<Inventory> getAllInventory(Pageable pageable);

	void deleteEquipment(String employeeId);

	Inventory getByEquipmentId(String id);

	boolean existByEquipmentName(String name);

	Inventory createEquipment(Inventory equipment);

	Inventory updateEquipment(Inventory form);

	Inventory setQuantity(ChangeQuantityInInventory form);

	ArrayList<Inventory> searchInventoryByLikeName(String name);

}
