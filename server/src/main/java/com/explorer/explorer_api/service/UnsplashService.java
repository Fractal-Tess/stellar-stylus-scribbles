package com.explorer.explorer_api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class UnsplashService {
    private final RestTemplate restTemplate;
    private final String apiKey;

    public UnsplashService(RestTemplateBuilder builder, @Value("${unsplash.api-key}") String apiKey) {
        this.restTemplate = builder.build();
        this.apiKey = apiKey;
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> searchImages(String query, int page, int pageSize) {
        String url = "https://api.unsplash.com/search/photos?query=" + UriUtils.encode(query, StandardCharsets.UTF_8)
            + "&page=" + page + "&per_page=" + pageSize + "&client_id=" + apiKey;
        return restTemplate.getForObject(url, Map.class);
    }
} 