package com.vti.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vti.entity.MessageByStaff;
import com.vti.repository.IMessageRepository;

@Service
@Transactional
public class MessageService implements IMessageService{
	@Autowired
	private IMessageRepository repository;

	@Override
	public List<MessageByStaff> getAllMessage() {
		List<MessageByStaff> mss = repository.findAll();
		return mss;
	}

	

	@Override
	public void createMessage(MessageByStaff form) {
		repository.save(form);
		
	}




	@Override
	public void deleteSender(String sender, String message) {
		List<MessageByStaff> mss = repository.findBySender(sender);
		String messageWantToDel = null ;
		for (int i = 0 ; i < mss.size() ; i++) {
			String message0 = mss.get(i).getMessage();
			if(message.equals(message0)) {
				messageWantToDel = message0;
			}
		}
		repository.deleteByMessage(messageWantToDel);
		
	}
	

	
}
