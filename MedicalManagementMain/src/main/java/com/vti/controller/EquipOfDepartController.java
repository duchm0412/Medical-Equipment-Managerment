package com.vti.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.FormTraMay;
import com.vti.entity.EquipOfDepart;
import com.vti.service.IEquipOfDepart;

@RestController
@RequestMapping(value = "api/v1/equiopfdp")
public class EquipOfDepartController {
	@Autowired
	private IEquipOfDepart service;

	@GetMapping(value = "/getbydp/{dpid}")
	public ResponseEntity<?> getEquipByDepartmentId(@PathVariable(name = "dpid") String dpId) {
		ArrayList<EquipOfDepart> entities = service.getEquipByDepartmentId(dpId);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<?> createEquipmentOfDp(@RequestBody EquipOfDepart equipment) {
		EquipOfDepart equipment0  = service.createEquipmentOfDp(equipment);
		if ( equipment0 != null ) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("false", HttpStatus.OK);
		}
		
	}
	@DeleteMapping(value = "/deleteEOD/{equipmentId}/{departmentId}")
	public ResponseEntity<?> deleteEquipmentbyEquipmentAndDepartment(@PathVariable (name = "equipmentId") String equipmentId,@PathVariable (name = "departmentId") String departmentId) {
		  service.deleteEquipmentbyEquipmentAndDepartment(equipmentId, departmentId);
			return new ResponseEntity<String>("success", HttpStatus.OK);
		
		
	}
}
