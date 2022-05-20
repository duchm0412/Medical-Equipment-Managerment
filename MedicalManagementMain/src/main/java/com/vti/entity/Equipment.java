package com.vti.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "`Equipment`")
public class Equipment {
	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private short id;

	@Column(name = "`EquipmentID`", length = 50, nullable = false, unique = true)
	private String equipmentId;

	@Column(name = "`EquipmentName`", length = 50, nullable = false, unique = true)
	private String equipmentName;

	@Column(name = "`classify`", length = 50, nullable = false, unique = true)
	private String classify;

	@Column(name = "`description`", length = 50, nullable = false, unique = true)
	private String description;

	@Column(name = "`brand`", length = 50, nullable = false, unique = true)
	private String brand;

	@Column(name = "`staffName`")
	private String staffName;

	@Column(name = "`insurance`", length = 50, nullable = false, unique = true)
	private String insurance;

	@Column(name = "`status`", nullable = false)
	private String equipmentStatus;
	


	public Equipment(short id, String equipmentId, String equipmentName, String classify, String description,
			String brand, String staffName, String insurance, String equipmentStatus) {
		super();
		this.id = id;
		this.equipmentId = equipmentId;
		this.equipmentName = equipmentName;
		this.classify = classify;
		this.description = description;
		this.brand = brand;
		this.staffName = staffName;
		this.insurance = insurance;
		this.equipmentStatus = equipmentStatus;
		
	}

	public Equipment() {
		super();
	}


	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

	

	public void setId(short id) {
		this.id = id;
	}

	public String getEquipmentId() {
		return equipmentId;
	}

	public void setEquipmentId(String equipmentId) {
		this.equipmentId = equipmentId;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getClassify() {
		return classify;
	}

	public void setClassify(String classify) {
		this.classify = classify;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getInsurance() {
		return insurance;
	}

	public void setInsurance(String insurance) {
		this.insurance = insurance;
	}

	public String getEquipmentStatus() {
		return equipmentStatus;
	}

	public void setEquipmentStatus(String equipmentStatus) {
		this.equipmentStatus = equipmentStatus;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
