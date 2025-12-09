package com.medfill.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medfill.service.ShopService;
import com.medfill.vo.Msg;
import com.medfill.vo.ShopDetails;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShopController {
	@Autowired
	private ShopService service;

	@GetMapping("/viewshops/{userId}")
	public ArrayList<ShopDetails> viewshops(@PathVariable int userId) {
		ArrayList<ShopDetails> list = service.viewshops(userId);
		return list;
	}
	
	@PostMapping("/add-shop")
	public Msg addMedicine(@RequestBody ShopDetails shopDetails) {
		Msg msg = service.addShop(shopDetails);
		return msg;
	}
	
	@GetMapping("/delete-shop")
	public Msg deleteShop(@RequestParam(name = "shopId") int shopId) {
		return service.deleteShop(shopId);
	}


}
