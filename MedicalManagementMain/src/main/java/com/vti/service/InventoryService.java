package com.vti.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vti.dto.ChangeQuantityInInventory;
import com.vti.entity.Inventory;
import com.vti.repository.InventoryRepository;

@Service
public class InventoryService implements IInventoryService {
	@Autowired
	private InventoryRepository repository;

	@Override
	public Page<Inventory> getAllInventory(Pageable pageable) {
		return repository.findAllCustom(pageable);
	}

	@Override
	public void deleteEquipment(String employeeId) {
		Inventory inv = repository.findByEquipmentId(employeeId);
		repository.delete(inv);

	}

	@Override
	public Inventory getByEquipmentId(String id) {
		return repository.findByEquipmentId(id);
	}

	@Override
	public boolean existByEquipmentName(String name) {
		Inventory inv = repository.findByEquipmentName(name);
		if (inv != null) {
			return true;
		} else {
			return false;
		}

	}

	@Override
	public Inventory createEquipment(Inventory equipment) {
		return repository.save(equipment);

	}

	@Override
	public Inventory updateEquipment(Inventory form) {
		Inventory eq = repository.findByEquipmentId(form.getEquipmentId());
		if (form.getEquipmentName() != null) {

			eq.setEquipmentName(form.getEquipmentName());
		}
		if (form.getInsurance() != null) {
			eq.setInsurance(form.getInsurance());
		}
		if (form.getStaffName() != null) {
			eq.setStaffName(form.getStaffName());
		}
		if (form.getBrand() != null) {
			eq.setBrand(form.getBrand());
		}
		if (form.getClassify() != null) {
			eq.setClassify(form.getClassify());
		}
		if (form.getDescription() != null) {
			eq.setDescription(form.getDescription());
		}
		if (form.getUnitPrice() != null) {
			eq.setUnitPrice(form.getUnitPrice());
		}
		if (form.getQuantity() > 0) {
			eq.setQuantity(form.getQuantity());
		}
		repository.save(eq);
		return (eq);
	}

	@Override
	public Inventory setQuantity(ChangeQuantityInInventory form) {
		Inventory eq = repository.findByEquipmentId(form.getEquipmentId());
		if (form.getQuantity() > 0) {
			eq.setQuantity(form.getQuantity());
		}
		repository.save(eq);
		return (eq);
	}

	@Override
	public ArrayList<Inventory> searchInventoryByLikeName(String name) {
		ArrayList<Inventory> dp = repository.searchInventory(name);
		return dp;
	}
}
