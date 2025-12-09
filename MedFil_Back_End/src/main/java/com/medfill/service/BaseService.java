package com.medfill.service;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

public class BaseService {

	@Autowired
	private DataSource ds;

	// getConnection
	protected Connection getConnection() {
		Connection con = null;
		try {
			con = ds.getConnection();
			con.setAutoCommit(false);
		} catch (SQLException e) {
			
		}
		return con;
	}

	// commit connection

	protected void commit(Connection con) {
		try {
			con.commit();
		} catch (SQLException e) {
			
		}
	}

	// rollback connection
	protected void rollback(Connection con) {
		try {
			con.rollback();
		} catch (SQLException e) {
			
		}
	}

	// close connection
	protected void close(Connection con) {
		try {
			con.close();
		} catch (SQLException e) {
		}
	}
}
