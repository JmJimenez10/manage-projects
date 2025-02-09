package dev.jmjimenez.manageprojects.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.jmjimenez.manageprojects.entity.OurUser;

public interface UserRepository extends JpaRepository<OurUser, Long> {
	Optional<OurUser> findByEmail(String email);
	
	List<OurUser> findByEmailVerifiedTrueAndEmailNotificationsTrue();

	int countByRole(String string);
}