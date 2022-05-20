package com.vti.dto;

import com.vti.entity.Inventory;

public class ChangeQuantityInInventory {

	private String equipmentId;
	private int quantity;

	public String getEquipmentId() {
		return equipmentId;
	}

	public void setEquipmentId(String equipmentId) {
		this.equipmentId = equipmentId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Inventory toEntity() {
		return new Inventory(equipmentId, quantity);
	}

}
