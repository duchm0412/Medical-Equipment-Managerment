package com.vti.service;

import java.util.ArrayList;

import com.vti.entity.EquipOfDepart;

public interface IEquipOfDepart {

	ArrayList<EquipOfDepart> getEquipByDepartmentId(String dpId);

	EquipOfDepart createEquipmentOfDp(EquipOfDepart equipment);

	boolean deleteEquipment(String id);

	void deleteEquipmentbyEquipmentAndDepartment(String id, String dId);

}
