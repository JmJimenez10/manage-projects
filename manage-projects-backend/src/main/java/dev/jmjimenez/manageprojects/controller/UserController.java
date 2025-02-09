package dev.jmjimenez.manageprojects.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import dev.jmjimenez.manageprojects.dto.UserDto;
import dev.jmjimenez.manageprojects.entity.OurUser;
import dev.jmjimenez.manageprojects.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController implements UserControllerOperation {
	
	@Autowired
    private UserService usersManagementService;
	
	@Override
	@PostMapping("/admin/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto reg){
        return ResponseEntity.ok(usersManagementService.register(reg));
    }

    @Override
	@PostMapping("/auth/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto req){
        return ResponseEntity.ok(usersManagementService.login(req));
    }

    @Override
	@PostMapping("/auth/refresh")
    public ResponseEntity<UserDto> refreshToken(@RequestBody UserDto req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }
    
    @Override
	@GetMapping("/admin/get-all-users")
    public ResponseEntity<UserDto> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());

    }

    @Override
	@GetMapping("/admin/get-user/{userId}")
    public ResponseEntity<UserDto> getUSerByID(@PathVariable Long userId){
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));

    }

    @Override
	@PutMapping("/adminuser/update/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody OurUser reqres){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, reqres));
    }

    @Override
	@GetMapping("/adminuser/get-profile")
    public ResponseEntity<UserDto> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UserDto response = usersManagementService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @Override
	@DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<UserDto> deleteUSer(@PathVariable Long userId){
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    }
    
    @Override
	@PostMapping("/adminuser/change-password")
    public ResponseEntity<UserDto> changePassword(@RequestBody UserDto request) {
        String email = request.getEmail();
        String newPassword = request.getPassword();

        UserDto response = usersManagementService.changePassword(email, newPassword);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    
    @Override
	@PostMapping("/auth/forgot-password")
    public ResponseEntity<UserDto> forgotPassword(@RequestBody UserDto request) {
        return ResponseEntity.ok(usersManagementService.forgotPassword(request));
    }
    
    @Override
	@PostMapping("/verify-email")
    public ResponseEntity<UserDto> verifyEmail(@RequestBody UserDto request) {
        String email = request.getEmail();
        String password = request.getPassword();

        UserDto response = usersManagementService.verifyEmail(email, password);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}