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

import com.vti.entity.Equipment;
import com.vti.service.IEquipmentService;

@RestController
@RequestMapping(value = "api/v1/equipments")
public class EquipmentController {
	@Autowired
	private IEquipmentService service;
	
		// Method này đã sử dụng với pageable
		@GetMapping()
		public ResponseEntity<?> getAllEquipment(Pageable pageable) {
			Page<Equipment> entities = service.getAllEquipment(pageable);
			return new ResponseEntity<>(entities, HttpStatus.OK);
		}
		@GetMapping(value="/nopage")
		public ResponseEntity<?> getAllEquipmentNoPaging() {
			ArrayList<Equipment> entities = service.getAllEquipmentNoPaging();
			return new ResponseEntity<>(entities, HttpStatus.OK);
		}
		// Test OK
		@PostMapping()
		public ResponseEntity<?> createEquipment(@RequestBody Equipment equipment) {
			service.createEquipment(equipment);
			return new ResponseEntity<String>("success", HttpStatus.OK);
		}
		
		
		@GetMapping(value = "/checkname/{name}")
		public ResponseEntity<?> existByEquipmentName(@PathVariable(name = "name") String name) {
			boolean b = service.existByEquipmentName(name);
			return new ResponseEntity<>(b, HttpStatus.OK);
		}
		
		@GetMapping(value = "/checkid/{id}")
		public ResponseEntity<?> existEquipmentByID(@PathVariable(name = "id") String id) {
			boolean b  = service.existEquipmentByID(id);
			return new ResponseEntity<>(b, HttpStatus.OK);
		}
		
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<?> deleteEquipment(@PathVariable(name = "id") String id) {
			service.deleteEquipment(id);
			return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
		}
		@PutMapping
		public ResponseEntity<?> updateEquipment(@RequestBody Equipment form) {
			service.updateEquipment(form);
			return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
		}
		@GetMapping(value = "/likename/{name}")
		public ResponseEntity<?> searchEquipmentByLikeName(@PathVariable(name = "name") String name) {
			ArrayList<Equipment> eq = service.searchEquipmentByLikeName(name);
			return new ResponseEntity<>(eq, HttpStatus.OK);
		}
}
