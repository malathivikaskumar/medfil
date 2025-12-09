package com.medfill.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.medfill.service.UserService;
import com.medfill.vo.Msg;
import com.medfill.vo.UserDetails;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService service;

	@PostMapping("/registration")
	public Msg registration(@RequestBody UserDetails user) {
		Msg msg = service.registration(user);
		return msg;
	}
	
	@PostMapping("/login")
	public Msg login(@RequestBody UserDetails user )
	{
		Msg msg = service.login(user);
		return msg;
	}
	
	@PostMapping("/reset-password")
	public Msg resetPassword(@RequestBody UserDetails user )
	{
		Msg msg = service.resetPassword(user);
		return msg;
	}

}
