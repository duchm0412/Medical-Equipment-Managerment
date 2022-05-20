package com.vti.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "`MessageByStaff`")
public class MessageByStaff  implements Serializable  {

		private static final long serialVersionUID = 1L;

		@Column(name = "id")
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;

		@Column(name = "`sender`")
		private String sender;

		@Column(name = "Message")
		private String message;

		public String getSender() {
			return sender;
		}

		public void setSender(String sender) {
			this.sender = sender;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public MessageByStaff(int id, String sender, String message) {
			super();
			this.id = id;
			this.sender = sender;
			this.message = message;
		}

		public MessageByStaff() {
			super();
		}

		
		
	}
