package com.vti.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.entity.MessageByStaff;
import com.vti.service.IMessageService;

@RestController
@RequestMapping(value = "api/v1/messages")
public class MessageByStaffController {
	@Autowired
	private IMessageService service;
	@GetMapping()
	public ResponseEntity<?> getAllMessage() {
		List<MessageByStaff> entities = service.getAllMessage();
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}
	@DeleteMapping(value = "/delete")
	public ResponseEntity<?> deleteSender(@RequestParam (name="sender") String sender , @RequestParam (name="message") String message) {
		service.deleteSender(sender,message);
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	@PostMapping()
	public ResponseEntity<?> createMessage(@RequestBody MessageByStaff form) {
		service.createMessage(form);
		return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
	}
}
