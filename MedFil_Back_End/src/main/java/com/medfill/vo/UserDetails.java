package com.medfill.vo;

public class UserDetails {

	private int userId;
	private String firstName;
	private String lastname;
	private String userEmail;
	private String userPassword;
	private boolean isMerchant;

	private ShopDetails shopDetails;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public boolean isMerchant() {
		return isMerchant;
	}

	public void setMerchant(boolean isMerchant) {
		this.isMerchant = isMerchant;
	}

	public ShopDetails getShopDetails() {
		return shopDetails;
	}

	public void setShopDetails(ShopDetails shopDetails) {
		this.shopDetails = shopDetails;
	}

	@Override
	public String toString() {
		return "UserDetails [userId=" + userId + ", firstName=" + firstName + ", lastname=" + lastname + ", userEmail="
				+ userEmail + ", userPassword=" + userPassword + ", isMerchant=" + isMerchant + ", shopDetails="
				+ shopDetails + "]";
	}

}
