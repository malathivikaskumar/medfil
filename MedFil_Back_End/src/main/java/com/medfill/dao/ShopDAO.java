package com.medfill.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import com.medfill.vo.ShopDetails;

@Repository
public class ShopDAO {

	public int shopRegistration(Connection con, ShopDetails shop, int user_id) throws SQLException {
		int n = 0;
		try {
			PreparedStatement ps = con.prepareStatement(
					"insert into shop_tbl(shop_name,address,town,district,state,country,pincode,user_id) values(?,?,?,?,?,?,?,?)");
			int i = 1;
			ps.setString(i++, shop.getShopName());
			ps.setString(i++, shop.getAddress());
			ps.setString(i++, shop.getTown());
			ps.setString(i++, shop.getDistrict());
			ps.setString(i++, shop.getState());
			ps.setString(i++, shop.getCountry());
			ps.setInt(i++, shop.getPincode());
			ps.setInt(i++, user_id);

			n = ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return n;
	}

	public ArrayList<ShopDetails> viewshops(Connection con, int userId) throws SQLException {
		ArrayList<ShopDetails> list = new ArrayList<>();
		try {

			PreparedStatement ps = con.prepareStatement(
					"select shop_id,shop_name,address,town,district,state,country,pincode,user_id from shop_tbl where user_id = ?");
			ps.setInt(1, userId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int shopId = rs.getInt(1);
				String shopName = rs.getString(2);
				String address = rs.getString(3);
				String town = rs.getString(4);
				String district = rs.getString(5);
				String state = rs.getString(6);
				String country = rs.getString(7);
				int pincode = rs.getInt(8);

				ShopDetails shop = new ShopDetails();
				shop.setShopId(shopId);
				shop.setShopName(shopName);
				shop.setAddress(address);
				shop.setTown(town);
				shop.setDistrict(district);
				shop.setState(state);
				shop.setCountry(country);
				shop.setPincode(pincode);
				list.add(shop);
			}
		} catch (SQLException e) {

			e.printStackTrace();
			throw e;
		}
		return list;

	}

	public int addShop(Connection con, ShopDetails shopDetails) throws SQLException {

		int i = 0;
		try {
			PreparedStatement ps = con.prepareStatement(
					"insert into shop_tbl(shop_name,address,town,district,state,country,pincode,user_id) values(?,?,?,?,?,?,?,?)");
			
			ps.setString(1, shopDetails.getShopName());
			ps.setString(2, shopDetails.getAddress());
			ps.setString(3, shopDetails.getTown());
			ps.setString(4, shopDetails.getDistrict());
			ps.setString(5, shopDetails.getState());
			ps.setString(6, shopDetails.getCountry());
			ps.setInt(7, shopDetails.getPincode());
			ps.setInt(8, shopDetails.getUserId());
			

			i = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return i;

	}

	public int deleteShop(Connection con, int shopId) throws SQLException {
		int i = 0;
		try {
			PreparedStatement ps = con.prepareStatement("delete from shop_tbl where shop_id= ? ");
			ps.setInt(1, shopId);
			i = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return i;
	}

}
