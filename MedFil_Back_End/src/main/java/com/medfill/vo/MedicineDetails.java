package com.medfill.vo;

import java.time.LocalDate;
import java.util.ArrayList;

public class MedicineDetails {

	private ArrayList<Integer> shopIdList;
	private int medId;
	private String medName;
	private int medQuantity;
	private LocalDate medExpiryDate;
	private String medDescription;
	private double medCost;
	private int shopId;
	private String medImage;

	private ShopDetails shopDetails;

	public void setShopId(int shopId) {
		this.shopId = shopId;
	}

	public int getMedId() {
		return medId;
	}

	public void setMedId(int medId) {
		this.medId = medId;
	}

	public String getMedName() {
		return medName;
	}

	public void setMedName(String medName) {
		this.medName = medName;
	}

	public int getMedQuantity() {
		return medQuantity;
	}

	public void setMedQuantity(int medQuantity) {
		this.medQuantity = medQuantity;
	}

	public LocalDate getMedExpiryDate() {
		return medExpiryDate;
	}

	public void setMedExpiryDate(LocalDate medExpiryDate) {
		this.medExpiryDate = medExpiryDate;
	}

	public String getMedDescription() {
		return medDescription;
	}

	public void setMedDescription(String medDescription) {
		this.medDescription = medDescription;
	}

	public double getMedCost() {
		return medCost;
	}

	public void setMedCost(double medCost) {
		this.medCost = medCost;
	}

	public int getShopId() {
		return shopId;
	}

	public ArrayList<Integer> getShopIdList() {
		return shopIdList;
	}

	public void setShopIdList(ArrayList<Integer> shopIdList) {
		this.shopIdList = shopIdList;
	}

	public ShopDetails getShopDetails() {
		return shopDetails;
	}

	public void setShopDetails(ShopDetails shopDetails) {
		this.shopDetails = shopDetails;
	}

	public String getMedImage() {
		return medImage;
	}

	public void setMedImage(String medImage) {
		this.medImage = medImage;
	}

	@Override
	public String toString() {
		return "MedicineDetails [shopIdList=" + shopIdList + ", medId=" + medId + ", medName=" + medName
				+ ", medQuantity=" + medQuantity + ", medExpiryDate=" + medExpiryDate + ", medDescription="
				+ medDescription + ", medCost=" + medCost + ", shopId=" + shopId + "]";
	}

}
