package com.vti.service;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vti.entity.Equipment;
import com.vti.repository.EquipmentRepository;

@Service
@Transactional
public class EquipmentService implements IEquipmentService {
	@Autowired
	private EquipmentRepository repository;

	// OK
	@Override
	public Page<Equipment> getAllEquipment(Pageable pageable) {
		return repository.findAllCustom(pageable);
	}

	@Override
	public void createEquipment(Equipment equipment) {
		Equipment eq = repository.findByEquipmentName(equipment.getEquipmentName());
		if (eq == null) {
			repository.save(equipment);
		}
		
	}

	@Override
	public boolean existByEquipmentName(String name) {
		Equipment eq = repository.findByEquipmentName(name);
		if (eq != null) {
			return true;
		}
		return false;
	}

	@Override
	public boolean existEquipmentByID(String id) {
		Equipment eq = repository.findByEquipmentId(id);
		if (eq != null) {
			return true;
		}
		return false;
	}

	@Override
	public void deleteEquipment(String id) {
		repository.deleteByEquipmentId(id);

	}

	@Override
	public void updateEquipment(Equipment form) {
		Equipment eq = repository.findByEquipmentId(form.getEquipmentId());
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
		if (form.getEquipmentStatus() != null) {
			eq.setEquipmentStatus(form.getEquipmentStatus());
		}
		repository.save(eq);

	}

	
	@Override
	public ArrayList<Equipment> searchEquipmentByLikeName(String name) {
		ArrayList<Equipment> dp = repository.searchEquipment(name);

		return dp;
	}

	@Override
	public ArrayList<Equipment> getAllEquipmentNoPaging() {
		repository.findAllCustom1();
		return null;
	}

}
