package dev.jmjimenez.manageprojects.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import dev.jmjimenez.manageprojects.entity.OurUser;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    
	private String username;
	private String fullName;
	private String email;
	private String password;
	private String role;
	private boolean firstLogin;
	private boolean emailVerified;
	private boolean emailNotifications;
	private LocalDateTime creationDate;
	
    private OurUser ourUser;
    private List<OurUser> ourUsersList;

}
