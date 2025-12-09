package com.medfill.service;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medfill.dao.MedicineDAO;
import com.medfill.vo.MedicineDetails;
import com.medfill.vo.Msg;

@Service
public class MedicineService extends BaseService {

	@Autowired
	private MedicineDAO dao;

	public Msg addMedicine(MedicineDetails medicineDetails) {
		Msg msg = new Msg();
		Connection con = null;
		try {
			con = getConnection();

			ArrayList<Integer> shopIdList = medicineDetails.getShopIdList();

			for (Integer shopId : shopIdList) {

				medicineDetails.setShopId(shopId);
				int i = dao.addMedicine(con, medicineDetails);
				if (i < 0) {
					throw new Exception();
				} else {
					msg.setSuccessMsg("Medicine added succussfully");
				}

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

	public List<MedicineDetails> searchMedicine(String medicineName, String pincode) {
		Connection con = null;
		List<MedicineDetails> list = null;
		try {
			con = getConnection();
			list = dao.searchMedicine(con, medicineName, pincode);
			
		} catch (Exception e) {
			rollback(con);
		} finally {
			close(con);
		}
		return list;
	}

	public List<MedicineDetails> listMedicine(int userId, String shopId) {
		Connection con = null;
		List<MedicineDetails> list = null;
		try {
			con = getConnection();
			list = dao.listMedicine(con, userId, shopId);
			
		} catch (Exception e) {
			rollback(con);
		} finally {
			close(con);
		}
		return list;
	}

	public Msg deleteMedicine(int medId) {
		Connection con = null;
		Msg msg = new Msg();
		try {
			con = getConnection();
			int i = dao.deleteMedicine(con, medId);
			msg.setSuccessMsg("Medicine Deleted Successfully");
			commit(con);
		} catch (Exception e) {
			rollback(con);
		} finally {
			close(con);
		}
		return msg;
	}

}
