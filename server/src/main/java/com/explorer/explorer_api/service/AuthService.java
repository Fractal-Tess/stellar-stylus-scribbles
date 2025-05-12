package com.explorer.explorer_api.service;

import com.explorer.explorer_api.model.User;
import com.explorer.explorer_api.repository.UserRepository;
import com.explorer.explorer_api.dto.SignUpRequest;
import com.explorer.explorer_api.dto.SignInRequest;
import com.explorer.explorer_api.dto.AuthResponse;
import com.explorer.explorer_api.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public AuthResponse signUp(SignUpRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already in use");
        }
        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
        );
        userRepository.save(user);
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        String token = jwtUtil.generateToken(user.getEmail(), claims);
        return new AuthResponse(token);
    }

    public AuthResponse signIn(SignInRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        String token = jwtUtil.generateToken(user.getEmail(), claims);
        return new AuthResponse(token);
    }
} 