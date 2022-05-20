package com.vti.service;

import java.util.List;

import com.vti.entity.MessageByStaff;

public interface IMessageService {

	List<MessageByStaff> getAllMessage();

	void createMessage(MessageByStaff form);

	void deleteSender(String sender, String message);

}
