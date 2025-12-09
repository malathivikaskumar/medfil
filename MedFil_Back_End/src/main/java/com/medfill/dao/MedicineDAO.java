package com.medfill.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.medfill.vo.MedicineDetails;
import com.medfill.vo.ShopDetails;

@Repository
public class MedicineDAO {

	public int addMedicine(Connection con, MedicineDetails medicineDetails) throws SQLException {
		int i = 0;
		try {
			PreparedStatement ps = con.prepareStatement(
					"insert into medicine_tbl(med_name,med_quantity,med_expiry_date,med_description,med_cost,shop_id) values(?,?,?,?,?,?)");
			ps.setString(1, medicineDetails.getMedName());
			ps.setInt(2, medicineDetails.getMedQuantity());
			ps.setString(3, medicineDetails.getMedExpiryDate().toString());
			ps.setString(4, medicineDetails.getMedDescription());
			ps.setDouble(5, medicineDetails.getMedCost());
			ps.setInt(6, medicineDetails.getShopId());

			i = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return i;

	}

	public List<MedicineDetails> searchMedicine(Connection con, String medicineName, String pincode)
			throws SQLException {
		List<MedicineDetails> list = new ArrayList<>();
		try {
			String query = "select med_id, med_name, med_quantity, med_image, med_expiry_date,med_description, med_cost, "
					+ "shop_name, address, town, district, state, country, pincode from medicine_tbl m, shop_tbl s "
					+ "where m.shop_id = s.shop_id ";
			if (medicineName != null && !medicineName.isEmpty()) {
				query += " and m.med_name like  ? ";
			}
			if (pincode != null && !pincode.isEmpty()) {
				query += " and s.pincode like ? ";
			}

			PreparedStatement ps = con.prepareStatement(query);
			int i = 1;
			if (medicineName != null && !medicineName.isEmpty()) {
				ps.setString(i++, "%" + medicineName + "%");
			}
			if (pincode != null && !pincode.isEmpty()) {
				ps.setString(i++, "%" + pincode + "%");
			}
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				MedicineDetails md = new MedicineDetails();

				md.setMedId(rs.getInt(1));
				md.setMedName(rs.getString(2));
				md.setMedQuantity(rs.getInt(3));
				md.setMedImage(rs.getString(4));
				md.setMedExpiryDate(LocalDate.now());
				md.setMedDescription(rs.getString(6));
				md.setMedCost(rs.getDouble(7));

				ShopDetails sd = new ShopDetails();
				sd.setShopName(rs.getString(8));
				sd.setAddress(rs.getString(9));
				sd.setTown(rs.getString(10));
				sd.setDistrict(rs.getString(11));
				sd.setState(rs.getString(12));
				sd.setCountry(rs.getString(13));
				sd.setPincode(rs.getInt(14));

				md.setShopDetails(sd);
				list.add(md);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return list;
	}

	public List<MedicineDetails> listMedicine(Connection con, int userId, String shopId) throws SQLException {
		List<MedicineDetails> list = new ArrayList<>();
		try {

			String query = "select med_id, med_name, med_quantity, med_image, med_expiry_date,med_description, med_cost,s.shop_name from medicine_tbl m , shop_tbl s "
					+ " where m.shop_id = s.shop_id and s.user_id= ? ";
			if (shopId != null && !shopId.isEmpty()) {
				query += " and m.shop_id in ( ? )";
			}

			PreparedStatement ps = con.prepareStatement(query);
			ps.setInt(1, userId);
			if (shopId != null && !shopId.isEmpty()) {
				ps.setString(2, shopId);
			}

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				MedicineDetails md = new MedicineDetails();

				md.setMedId(rs.getInt(1));
				md.setMedName(rs.getString(2));
				md.setMedQuantity(rs.getInt(3));
				md.setMedImage(rs.getString(4));
				md.setMedExpiryDate(LocalDate.now());
				md.setMedDescription(rs.getString(6));
				md.setMedCost(rs.getDouble(7));

				ShopDetails sd = new ShopDetails();
				sd.setShopName(rs.getString(8));

				md.setShopDetails(sd);
				list.add(md);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return list;
	}

	public int deleteMedicine(Connection con, int medId) throws SQLException {
		int i = 0;
		try {
			PreparedStatement ps = con.prepareStatement("delete from medicine_tbl where med_id= ? ");
			ps.setInt(1, medId);
			i = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return i;
	}

	public int deleteAllMedicines(Connection con, int shopId) throws SQLException {
		int i = 0;
		try {
			PreparedStatement ps = con.prepareStatement("delete from medicine_tbl where shop_id= ? ");
			ps.setInt(1, shopId);
			i = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return i;

	}

}
