package com.explorer.explorer_api.service;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class SpaceflightNewsService {
    private final RestTemplate restTemplate;

    public SpaceflightNewsService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getLatestNews(int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        String url = "https://api.spaceflightnewsapi.net/v4/articles/?limit=" + pageSize + "&offset=" + offset;
        return restTemplate.getForObject(url, Map.class);
    }
} 