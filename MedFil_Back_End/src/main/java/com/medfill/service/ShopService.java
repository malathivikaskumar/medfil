package com.medfill.service;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medfill.dao.MedicineDAO;
import com.medfill.dao.ShopDAO;
import com.medfill.vo.Msg;
import com.medfill.vo.ShopDetails;

@Service
public class ShopService extends BaseService {
	@Autowired
	private ShopDAO dao;
	
	@Autowired
	private MedicineDAO mDao;

	public ArrayList<ShopDetails> viewshops(int userId) {
		ArrayList<ShopDetails> list = null;
		Connection con = null;
		try {
			con = getConnection();
			list = dao.viewshops(con, userId);
		} catch (SQLException e) {
			rollback(con);
			e.printStackTrace();
		} finally {
			close(con);
		}
		return list;

	}

	public Msg addShop(ShopDetails shopDetails) {

		Msg msg = new Msg();
		Connection con = null;
		try {
			con = getConnection();

			int i = dao.addShop(con, shopDetails);
			if (i < 0) {
				throw new Exception();
			} else {
				msg.setSuccessMsg("Shop added succussfully");
			}
			commit(con);
		} catch (Exception e) {
			rollback(con);
			msg.setErrorMsg("Exception in the Add medicine flow: ");
		} finally {
			close(con);
		}
		return msg;

	}

	public Msg deleteShop(int shopId) {
		Connection con = null;
		Msg msg = new Msg();
		try {
			con = getConnection();
			int  i = mDao.deleteAllMedicines(con, shopId);
					
			i = dao.deleteShop(con, shopId);
			
			msg.setSuccessMsg("Shop Deleted Successfully");
			commit(con);
		} catch (Exception e) {
			rollback(con);
		} finally {
			close(con);
		}
		return msg;
	}
}
