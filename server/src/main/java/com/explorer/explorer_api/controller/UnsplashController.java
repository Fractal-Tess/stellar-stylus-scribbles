package com.explorer.explorer_api.controller;

import com.explorer.explorer_api.service.UnsplashService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/unsplash")
public class UnsplashController {
    private final UnsplashService unsplashService;

    public UnsplashController(UnsplashService unsplashService) {
        this.unsplashService = unsplashService;
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchImages(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "18") int pageSize
    ) {
        return ResponseEntity.ok(unsplashService.searchImages(query, page, pageSize));
    }
} 