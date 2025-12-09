package com.medfill.vo;

import java.util.List;

public class Msg {

	private String successMsg;
	private String errorMsg;
	private UserDetails userDetails;
	private List<MedicineDetails> medicinList;

	public String getSuccessMsg() {
		return successMsg;
	}

	public void setSuccessMsg(String successMsg) {
		this.successMsg = successMsg;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public UserDetails getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(UserDetails userDetails) {
		this.userDetails = userDetails;
	}

	public List<MedicineDetails> getMedicinList() {
		return medicinList;
	}

	public void setMedicinList(List<MedicineDetails> medicinList) {
		this.medicinList = medicinList;
	}

	@Override
	public String toString() {
		return "Msg [successMsg=" + successMsg + ", errorMsg=" + errorMsg + ", userDetails=" + userDetails + "]";
	}

}
