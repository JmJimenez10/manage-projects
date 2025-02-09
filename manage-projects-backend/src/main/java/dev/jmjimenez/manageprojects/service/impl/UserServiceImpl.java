package dev.jmjimenez.manageprojects.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.jmjimenez.manageprojects.dto.UserDto;
import dev.jmjimenez.manageprojects.entity.OurUser;
import dev.jmjimenez.manageprojects.repository.UserRepository;
import dev.jmjimenez.manageprojects.service.UserService;
import dev.jmjimenez.manageprojects.utils.JWTUtils;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository usersRepo;
	@Autowired
	private JWTUtils jwtUtils;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDto register(UserDto registrationRequest) {
		UserDto resp = new UserDto();

		try {

			if (usersRepo.findByEmail(registrationRequest.getEmail()).isPresent()) {
				resp.setMessage("Email duplicado");
				return resp;
			}

			OurUser ourUser = new OurUser();
			ourUser.setUsername(registrationRequest.getUsername());
			ourUser.setFullName(registrationRequest.getFullName());
			ourUser.setEmail(registrationRequest.getEmail());
			ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
			ourUser.setRole(registrationRequest.getRole());
			ourUser.setCreationDate(registrationRequest.getCreationDate());

			OurUser ourUsersResult = usersRepo.save(ourUser);
			if (ourUsersResult.getId() > 0) {
				resp.setOurUser((ourUsersResult));
				resp.setMessage("User Saved Successfully");
				resp.setStatusCode(200);
			}

		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setError(e.getMessage());
		}
		return resp;
	}

	@Override
	public UserDto login(UserDto loginRequest) {
		UserDto response = new UserDto();
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
			var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
			var jwt = jwtUtils.generateToken(user);
			var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

			response.setMessage("Successfully Logged In");
			response.setFirstLogin(false);

			response.setStatusCode(200);
			response.setToken(jwt);
			response.setRole(user.getRole());
			response.setRefreshToken(refreshToken);
			response.setExpirationTime("24Hrs");

		} catch (BadCredentialsException e) {
			response.setStatusCode(401);
			response.setMessage("Credenciales inválidas");
		} catch (UsernameNotFoundException e) {
			response.setStatusCode(404);
			response.setMessage("Usuario no encontrado.");
		} catch (AuthenticationException e) {
			response.setStatusCode(500);
			response.setMessage("Error de autenticación: " + e.getMessage());
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
		}
		return response;
	}

	@Override
	public UserDto refreshToken(UserDto refreshTokenReqiest) {
		UserDto response = new UserDto();
		try {
			String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
			OurUser users = usersRepo.findByEmail(ourEmail).orElseThrow();
			if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
				var jwt = jwtUtils.generateToken(users);
				response.setStatusCode(200);
				response.setToken(jwt);
				response.setRefreshToken(refreshTokenReqiest.getToken());
				response.setExpirationTime("24Hr");
				response.setMessage("Successfully Refreshed Token");
			}
			response.setStatusCode(200);
			return response;

		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
		}
	}

	@Override
	public UserDto getAllUsers() {
		UserDto reqRes = new UserDto();

		try {
			List<OurUser> result = usersRepo.findAll();
			if (!result.isEmpty()) {
				reqRes.setOurUsersList(result);
				reqRes.setStatusCode(200);
				reqRes.setMessage("Successful");
			} else {
				reqRes.setStatusCode(404);
				reqRes.setMessage("No users found");
			}
			return reqRes;
		} catch (Exception e) {
			reqRes.setStatusCode(500);
			reqRes.setMessage("Error occurred: " + e.getMessage());
			return reqRes;
		}
	}

	@Override
	public UserDto getUsersById(Long id) {
		UserDto reqRes = new UserDto();
		try {
			OurUser usersById = usersRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
			reqRes.setOurUser(usersById);
			reqRes.setStatusCode(200);
			reqRes.setMessage("Users with id '" + id + "' found successfully");
		} catch (Exception e) {
			reqRes.setStatusCode(500);
			reqRes.setMessage("Error occurred: " + e.getMessage());
		}
		return reqRes;
	}

	@Override
	public UserDto deleteUser(Long userId) {
		UserDto reqRes = new UserDto();
		try {
			Optional<OurUser> userOptional = usersRepo.findById(userId);
			if (userOptional.isPresent()) {
				usersRepo.deleteById(userId);
				reqRes.setStatusCode(200);
				reqRes.setMessage("User deleted successfully");
			} else {
				reqRes.setStatusCode(404);
				reqRes.setMessage("User not found for deletion");
			}
		} catch (Exception e) {
			reqRes.setStatusCode(500);
			reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
		}
		return reqRes;
	}

	@Override
	public UserDto updateUser(Long userId, OurUser updatedUser) {
		UserDto reqRes = new UserDto();
		try {
			Optional<OurUser> userOptional = usersRepo.findById(userId);
			if (userOptional.isPresent()) {
				OurUser existingUser = userOptional.get();

				existingUser.setUsername(updatedUser.getUsername());
				existingUser.setFullName(updatedUser.getFullName());
				existingUser.setEmail(updatedUser.getEmail());
				existingUser.setRole(updatedUser.getRole());
				existingUser.setEmailNotifications(updatedUser.isEmailNotifications());
				existingUser.setCreationDate(updatedUser.getCreationDate());

				OurUser savedUser = usersRepo.save(existingUser);
				reqRes.setOurUser(savedUser);
				reqRes.setStatusCode(200);
				reqRes.setMessage("User updated successfully");
			} else {
				reqRes.setStatusCode(404);
				reqRes.setMessage("User not found for update");
			}
		} catch (Exception e) {
			reqRes.setStatusCode(500);
			reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
		}
		return reqRes;
	}

	@Override
	public UserDto getMyInfo(String email) {
		UserDto reqRes = new UserDto();
		try {
			Optional<OurUser> userOptional = usersRepo.findByEmail(email);
			if (userOptional.isPresent()) {
				reqRes.setOurUser(userOptional.get());
				reqRes.setStatusCode(200);
				reqRes.setMessage("successful");
			} else {
				reqRes.setStatusCode(404);
				reqRes.setMessage("User not found for update");
			}

		} catch (Exception e) {
			reqRes.setStatusCode(500);
			reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
		}
		return reqRes;
	}

	@Override
	public UserDto changePassword(String email, String newPassword) {
		UserDto response = new UserDto();
		try {
			Optional<OurUser> userOptional = usersRepo.findByEmail(email);
			if (userOptional.isPresent()) {
				OurUser user = userOptional.get();
				user.setPassword(passwordEncoder.encode(newPassword));

				usersRepo.save(user);
				response.setStatusCode(200);
				response.setMessage("Password changed successfully");
			} else {
				response.setStatusCode(404);
				response.setMessage("User not found");
			}
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error occurred while changing password: " + e.getMessage());
		}
		return response;
	}

	@Override
	public UserDto forgotPassword(UserDto request) {
		UserDto response = new UserDto();
		try {
			String email = request.getEmail();
			String newPassword = request.getPassword();

			Optional<OurUser> userOptional = usersRepo.findByEmail(email);
			if (userOptional.isPresent()) {
				OurUser user = userOptional.get();

				user.setPassword(passwordEncoder.encode(newPassword));
				usersRepo.save(user);

				response.setStatusCode(200);
				response.setMessage("Contraseña restablecida exitosamente");

				String jwt = jwtUtils.generateToken(user);
				response.setToken(jwt);
			} else {
				response.setStatusCode(404);
				response.setMessage("Usuario no encontrado");
			}
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al procesar la solicitud de restablecimiento de contraseña: " + e.getMessage());
		}
		return response;
	}

	@Override
	public UserDto verifyEmail(String email, String password) {
		UserDto response = new UserDto();
		try {
			Optional<OurUser> userOptional = usersRepo.findByEmail(email);
			if (userOptional.isPresent()) {
				OurUser user = userOptional.get();

				if (passwordEncoder.matches(password, user.getPassword())) {
					user.setEmailVerified(true);
					usersRepo.save(user);
					response.setStatusCode(200);
					response.setMessage("Email verificado exitosamente");
					response.setEmailVerified(true);
				} else {
					response.setStatusCode(401);
					response.setMessage("Credenciales inválidas para verificar el email");
				}
			} else {
				response.setStatusCode(404);
				response.setMessage("Usuario no encontrado para verificar el email");
			}
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error al verificar el email: " + e.getMessage());
		}
		return response;
	}
}
