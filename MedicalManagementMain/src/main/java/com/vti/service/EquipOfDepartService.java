package com.vti.service;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vti.entity.EquipOfDepart;
import com.vti.repository.IEquipOfDpRepository;

@Service
@Transactional
public class EquipOfDepartService implements IEquipOfDepart {
	@Autowired
	private IEquipOfDpRepository repositoryEOD;

	@Override
	public ArrayList<EquipOfDepart> getEquipByDepartmentId(String dpId) {
		ArrayList<EquipOfDepart> equips = repositoryEOD.findByDepartmentId(dpId);
		return equips;
	}

	@Override
	public EquipOfDepart createEquipmentOfDp(EquipOfDepart equipment) {
		
		return repositoryEOD.save(equipment);
		
		
	}

	@Override
	public boolean deleteEquipment(String id) {
		boolean b = repositoryEOD.deleteByEquipmentId(id);
		return  b;
	}

	@Override
	public void deleteEquipmentbyEquipmentAndDepartment(String eId, String dId) {
		ArrayList<EquipOfDepart> equips = repositoryEOD.findAllByEquipmentId(eId);
		int n = equips.size();
		String dpIdwantToDel = null ;
		for (int i = 0 ; i < n ; i++) {
			String dpId = equips.get(i).getDepartmentId();
			if(dpId.equals(dId)) {
				dpIdwantToDel = dpId;
			}
		}
		repositoryEOD.deleteByDepartmentId(dpIdwantToDel);
		
	}

}
