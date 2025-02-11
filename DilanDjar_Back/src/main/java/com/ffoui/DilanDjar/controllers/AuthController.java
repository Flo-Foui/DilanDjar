package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.doas.UserDao;
import com.ffoui.DilanDjar.entities.User;
import com.ffoui.DilanDjar.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserDao userDao;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserDao userDao, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDao = userDao;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        boolean alreadyExists = userDao.existsByEmail(user.getEmail());
        if (alreadyExists) {
            return ResponseEntity.badRequest().body("Error: Email is already use");
        }

        User newUser = new User(
                user.getEmail(),
                encoder.encode(user.getPassword()),
                "USER"
        );
        boolean isUserSaved = userDao.createUser(newUser);
        return isUserSaved ?
                ResponseEntity.ok("User registered succesfully!")
                :
                ResponseEntity.badRequest().body("Error: User registration failed");
    }

    @PostMapping("/login")
    public String authenticateUser(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken((userDetails.getUsername()));
    }
}