package com.explorer.explorer_api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class NasaApodService {
    private final RestTemplate restTemplate;
    private final String apiKey;

    public NasaApodService(RestTemplateBuilder builder, @Value("${nasa.apod.api-key}") String apiKey) {
        this.restTemplate = builder.build();
        this.apiKey = apiKey;
    }

    public Map<String, Object> getApod() {
        String url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
        return restTemplate.getForObject(url, Map.class);
    }
} 