package dev.jmjimenez.manageprojects.controller;

import org.springframework.http.ResponseEntity;

import dev.jmjimenez.manageprojects.dto.UserDto;
import dev.jmjimenez.manageprojects.entity.OurUser;

public interface UserControllerOperation {

	ResponseEntity<UserDto> register(UserDto reg);

	ResponseEntity<UserDto> login(UserDto req);

	ResponseEntity<UserDto> refreshToken(UserDto req);

	ResponseEntity<UserDto> getAllUsers();

	ResponseEntity<UserDto> getUSerByID(Long userId);

	ResponseEntity<UserDto> updateUser(Long userId, OurUser reqres);

	ResponseEntity<UserDto> getMyProfile();

	ResponseEntity<UserDto> deleteUSer(Long userId);

	ResponseEntity<UserDto> changePassword(UserDto request);

	ResponseEntity<UserDto> forgotPassword(UserDto request);

	ResponseEntity<UserDto> verifyEmail(UserDto request);

}