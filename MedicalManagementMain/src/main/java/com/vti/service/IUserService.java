package com.vti.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.vti.dto.ChangePublicProfileDTO;
import com.vti.entity.User;
import com.vti.entity.UserStatus;

public interface IUserService extends UserDetailsService {

	void createUser(User user);

	User findUserByEmail(String email);

	User findUserByUserName(String username);

	void activeUser(String token);

	void sendConfirmUserRegistrationViaEmail(String email);

	boolean existsUserByEmail(String email);

	boolean existsUserByUserName(String userName);

	void resetPasswordViaEmail(String email);

	void resetPassword(String token, String newPassword);

	void sendResetPasswordViaEmail(String email);

	UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
	
	void changeUserProfile(String username, ChangePublicProfileDTO dto);

	boolean existsUserByPhone(String phone);

	
	

	void createUserWithInfoByFacebook(String username, String email, String firstName, String lastName);



}
