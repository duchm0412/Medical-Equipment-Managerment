package com.vti.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "`EquipOfDepart`")
public class EquipOfDepart {

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private short id;

	@Column(name = "`EquipmentID`")
	private String equipmentId;

	@Column(name = "`EquipmentName`")
	private String equipmentName;

	@Column(name = "`classify`")
	private String classify;

	@Column(name = "`description`")
	private String description;

	@Column(name = "`brand`")
	private String brand;

	@Column(name = "`staffName`")
	private String staffName;

	@Column(name = "`insurance`")
	private String insurance;

	@Column(name = "`status`")
	private String equipmentStatus;

	@Column(name = "`DepartmentID`")
	private String departmentId;


	@Column(name = "`quantity`", length = 50, nullable = false, unique = true)
	private int quantity;

	@Column(name = "`unitPrice`")
	private String unitPrice;

	public EquipOfDepart() {
		super();
	}

	

	public EquipOfDepart(short id, String equipmentId, String equipmentName, String classify, String description,
			String brand, String staffName, String insurance, String equipmentStatus, String departmentId, int quantity,
			String unitPrice) {
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
		this.departmentId = departmentId;
		this.quantity = quantity;
		this.unitPrice = unitPrice;
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

	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
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

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public int getQuantity() {
		return quantity;
	}



	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}



	public String getUnitPrice() {
		return unitPrice;
	}



	public void setUnitPrice(String unitPrice) {
		this.unitPrice = unitPrice;
	}



	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
