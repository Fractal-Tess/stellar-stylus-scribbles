package com.explorer.explorer_api.controller;

import com.explorer.explorer_api.dto.SignUpRequest;
import com.explorer.explorer_api.dto.SignInRequest;
import com.explorer.explorer_api.dto.AuthResponse;
import com.explorer.explorer_api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@Valid @RequestBody SignUpRequest request) {
        System.out.println("signUp");
        AuthResponse response = authService.signUp(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@Valid @RequestBody SignInRequest request) {
        System.out.println("signIn");
        AuthResponse response = authService.signIn(request);
        return ResponseEntity.ok(response);
    }
} 