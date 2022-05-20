package com.vti.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.ChangeQuantityInInventory;
import com.vti.entity.Inventory;
import com.vti.service.IInventoryService;

@RestController
@RequestMapping(value = "api/v1/inventorys")
public class InventoryController {
	@Autowired
	private IInventoryService service;

	// Method này đã sử dụng với pageable
	@GetMapping()
	public ResponseEntity<?> getAllInventory(Pageable pageable) {
		Page<Inventory> entities = service.getAllInventory(pageable);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

	// Test OK
	@PostMapping()
	public ResponseEntity<?> createEquipment(@RequestBody Inventory equipment) {
		Inventory inv = service.createEquipment(equipment);
		if (inv != null) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("failure", HttpStatus.OK);
		}

	}

	@PostMapping(value = "/setQuantity")
	public ResponseEntity<?> setQuantity(@RequestBody ChangeQuantityInInventory form) {
		Inventory b = service.setQuantity(form);
		if(b != null) {
			return new ResponseEntity<>("success", HttpStatus.OK);
		}else {
			return new ResponseEntity<>("false", HttpStatus.OK);
		}
		

	}

	// Tìm thiết bị bằng tên của thiết bị đó
	@GetMapping(value = "/checkname/{name}")
	public ResponseEntity<?> existByEquipmentName(@PathVariable(name = "name") String name) {
		boolean b = service.existByEquipmentName(name);
		return new ResponseEntity<>(b, HttpStatus.OK);
	}

	// Tìm thiết bị bằng id của thiết bị đó
	@GetMapping(value = "/{equipmentId}")
	public ResponseEntity<?> getByEquipmentId(@PathVariable(name = "equipmentId") String id) {
		Inventory entities = service.getByEquipmentId(id);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

	// Xóa thiết bị trong kho bằng id
	@DeleteMapping(value = "/equipmentId/{equipmentId}")
	public ResponseEntity<?> deleteEquipment(@PathVariable(name = "equipmentId") String equipmentId) {
		service.deleteEquipment(equipmentId);
		return new ResponseEntity<String>("success", HttpStatus.OK);

	}

	@PutMapping
	public ResponseEntity<?> updateEquipment(@RequestBody Inventory form) {
		Inventory inv = service.updateEquipment(form);
		if (inv != null) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("failure", HttpStatus.OK);
		}
	}

	@GetMapping(value = "/likename/{name}")
	public ResponseEntity<?> searchInventoryByLikeName(@PathVariable(name = "name") String name) {
		ArrayList<Inventory> dp = service.searchInventoryByLikeName(name);
		return new ResponseEntity<>(dp, HttpStatus.OK);
	}
}
