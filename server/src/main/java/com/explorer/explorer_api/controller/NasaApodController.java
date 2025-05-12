package com.explorer.explorer_api.controller;

import com.explorer.explorer_api.service.NasaApodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/apod")
public class NasaApodController {
    private final NasaApodService nasaApodService;

    public NasaApodController(NasaApodService nasaApodService) {
        this.nasaApodService = nasaApodService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getApod() {
        return ResponseEntity.ok(nasaApodService.getApod());
    }
} 