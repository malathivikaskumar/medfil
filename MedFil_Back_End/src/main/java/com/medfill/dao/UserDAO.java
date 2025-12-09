package com.medfill.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Repository;

import com.medfill.vo.UserDetails;

@Repository
public class UserDAO {

	public int registration(Connection con, UserDetails user) {
		int user_id = 0;
		try {
			PreparedStatement ps = con.prepareStatement(
					"insert into user_login_tbl(first_name,last_name,user_email,user_password,is_merchant) values(?,?,?,?,?)",
					PreparedStatement.RETURN_GENERATED_KEYS);
			ps.setString(1, user.getFirstName());
			ps.setString(2, user.getLastname());
			ps.setString(3, user.getUserEmail());
			ps.setString(4, user.getUserPassword());

			if (user.getShopDetails() != null) {
				ps.setInt(5, 1);
			} else {
				ps.setInt(5, 0);
			}

			int i = ps.executeUpdate();

			ResultSet generatedKeys = ps.getGeneratedKeys();
			while (generatedKeys.next()) {
				user_id = generatedKeys.getInt(1);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user_id;
	}

	public boolean isuserExist(Connection con, String email) throws SQLException {

		boolean isuserExist = false;
		try {
			PreparedStatement ps = con.prepareStatement("select user_email from user_login_tbl where user_email = ?");
			ps.setString(1, email);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {

				isuserExist = true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return isuserExist;
	}

	public UserDetails login(Connection con, UserDetails user) throws SQLException {
		UserDetails u = new UserDetails();
		try {
			PreparedStatement ps = con.prepareStatement(
					"select user_id,first_name,user_email,is_merchant from user_login_tbl where user_email = ? and user_password = ?");
			ps.setString(1, user.getUserEmail());
			ps.setString(2, user.getUserPassword());
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				u.setUserId(rs.getInt(1));
				u.setFirstName(rs.getString(2));
				u.setUserEmail(rs.getString(3));

				if (rs.getInt(4) == 1) {
					u.setMerchant(true);
				} else {
					u.setMerchant(false);
				}

			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
		return u;
	}

	public int resetPassword(Connection con, UserDetails user) {

		int i = 0;
		try {
			PreparedStatement ps = con
					.prepareStatement("update user_login_tbl set user_password = ? where user_email= ?");
			ps.setString(1, user.getUserPassword());
			ps.setString(2, user.getUserEmail());

			i = ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return i;

	}

}
