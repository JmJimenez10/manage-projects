package dev.jmjimenez.manageprojects.service;

import dev.jmjimenez.manageprojects.dto.UserDto;
import dev.jmjimenez.manageprojects.entity.OurUser;

public interface UserService {

	UserDto register(UserDto registrationRequest);

	UserDto login(UserDto loginRequest);

	UserDto refreshToken(UserDto refreshTokenReqiest);

	UserDto getAllUsers();

	UserDto getUsersById(Long id);

	UserDto deleteUser(Long userId);

	UserDto updateUser(Long userId, OurUser updatedUser);

	UserDto getMyInfo(String email);

	UserDto changePassword(String email, String newPassword);

	UserDto forgotPassword(UserDto request);

	UserDto verifyEmail(String email, String password);

}