package com.vti.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.vti.entity.MessageByStaff;

@Repository
public interface IMessageRepository extends JpaRepository<MessageByStaff, Short>, JpaSpecificationExecutor<MessageByStaff> {

	void deleteBySender(String sender);

	List<MessageByStaff> findBySender(String string);

	void deleteByMessage(String messageWantToDel);
}