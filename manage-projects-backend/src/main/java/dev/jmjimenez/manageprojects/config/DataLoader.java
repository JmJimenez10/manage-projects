package dev.jmjimenez.manageprojects.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import dev.jmjimenez.manageprojects.entity.OurUser;
import dev.jmjimenez.manageprojects.repository.UserRepository;

import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.countByRole("ADMIN") == 0) {
            OurUser admin = new OurUser();
            admin.setUsername("Admin");
            admin.setFullName("Administrator");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole("ADMIN");
            admin.setEmailVerified(false);
            admin.setEmailNotifications(false);
            admin.setCreationDate(LocalDateTime.now());
            userRepository.save(admin);
        }
    }
}