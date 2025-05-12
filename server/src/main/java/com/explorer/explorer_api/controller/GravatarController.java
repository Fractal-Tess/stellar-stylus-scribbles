package com.explorer.explorer_api.controller;

import com.explorer.explorer_api.dto.GravatarHashResponse;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/gravatar")
public class GravatarController {

    @GetMapping
    @Operation(summary = "Get Gravatar URL for authenticated user", security = @SecurityRequirement(name = "bearerAuth"))
    public GravatarHashResponse getGravatarHash(@AuthenticationPrincipal Jwt principal) {
        String email = (String) principal.getSubject();
        if (email == null) {
            throw new IllegalArgumentException("Email not found in JWT");
        }
        String hash = hashEmail(email);
        String url = getGravatarAvatarUrl(hash);
        return new GravatarHashResponse(url);
    }

    private String hashEmail(String email) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(email.trim().toLowerCase().getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not found", e);
        }
    }
    
    private String getGravatarAvatarUrl(String hash) {
        return "https://www.gravatar.com/avatar/" + hash;
    }
    
} 