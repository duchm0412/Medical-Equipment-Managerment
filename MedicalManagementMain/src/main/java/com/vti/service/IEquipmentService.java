package com.vti.service;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.entity.Equipment;

public interface IEquipmentService {

	Page<Equipment> getAllEquipment(Pageable pageable);

	void createEquipment(Equipment equipment);

	boolean existByEquipmentName(String name);

	boolean existEquipmentByID(String id);

	void deleteEquipment(String id);

	void updateEquipment(Equipment form);

	

	ArrayList<Equipment> searchEquipmentByLikeName(String name);

	ArrayList<Equipment> getAllEquipmentNoPaging();

	

}
