package com.medfill.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medfill.service.MedicineService;
import com.medfill.vo.MedicineDetails;
import com.medfill.vo.Msg;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MedicineController {

	@Autowired
	private MedicineService service;

	@PostMapping("/add-medicine")
	public Msg addMedicine(@RequestBody MedicineDetails medidcineDetails) {
		Msg msg = service.addMedicine(medidcineDetails);
		return msg;
	}

	@GetMapping("/list-medicine")
	public List<MedicineDetails> listMedicine(@RequestParam(name = "userId") int userId,
			@RequestParam(name = "shops") String shopId) {
		return service.listMedicine(userId, shopId);

	}

	@GetMapping("/search-medicine")
	public List<MedicineDetails> searchMedicine(@RequestParam(name = "medicine") String medicineName,
			@RequestParam(name = "pincode") String pincode) {

		return service.searchMedicine(medicineName, pincode);

	}

	@GetMapping("/delete-medicine")
	public Msg deleteMedicine(@RequestParam(name = "medId") int medId) {
		return service.deleteMedicine(medId);
	}

}
