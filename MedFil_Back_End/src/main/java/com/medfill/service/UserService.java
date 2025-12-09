package com.medfill.service;

import java.sql.Connection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medfill.dao.ShopDAO;
import com.medfill.dao.UserDAO;
import com.medfill.vo.Msg;
import com.medfill.vo.ShopDetails;
import com.medfill.vo.UserDetails;

@Service
public class UserService extends BaseService {

	@Autowired
	private UserDAO dao;
	@Autowired
	private ShopDAO d;

	public Msg registration(UserDetails user) {
		Msg msg = new Msg();
		Connection con = null;
		try {
			con = getConnection();

			String email = user.getUserEmail();
			boolean isExists = dao.isuserExist(con, email);

			if (!isExists) {
				int user_id = dao.registration(con, user);
				if (user_id > 0) {
					ShopDetails shop = user.getShopDetails();
					if (shop != null) {
						int n = d.shopRegistration(con, shop, user_id);
					}
					msg.setSuccessMsg("Succesfully Registered");
				} else {
					msg.setErrorMsg("unable to register");
				}
			} else {
				msg.setErrorMsg("user already exists");
			}
			commit(con);
		} catch (Exception e) {
			rollback(con);
			msg.setErrorMsg("Exception in the registration flow: ");
		} finally {
			close(con);
		}
		return msg;

	}

	public Msg login(UserDetails user) {
		Connection con = null;
		Msg msg = new Msg();
		try {
			con = getConnection();

			UserDetails userDetails = dao.login(con, user);
			if (userDetails.getUserId() == 0) {
				msg.setErrorMsg("invalid username or password");
			} else {
				msg.setUserDetails(userDetails);
			}

			commit(con);
		} catch (Exception e) {
			rollback(con);
			msg.setErrorMsg("Exception in the Login flow: ");
		} finally {
			close(con);
		}
		return msg;
	}

	public Msg resetPassword(UserDetails user) {

		Connection con = null;
		Msg msg = new Msg();
		try {
			con = getConnection();

			int i = dao.resetPassword(con, user);
			if (i > 0) {
				msg.setSuccessMsg("Successfully Updated");
			} else {
				msg.setErrorMsg("Reset password failed");
			}
			commit(con);
		} catch (Exception e) {
			rollback(con);
			msg.setErrorMsg("Exception in the Login flow: ");
		} finally {
			close(con);
		}
		return msg;

	}

}
