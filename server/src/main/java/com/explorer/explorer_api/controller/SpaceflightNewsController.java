package com.explorer.explorer_api.controller;

import com.explorer.explorer_api.service.SpaceflightNewsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/spaceflight-news")
public class SpaceflightNewsController {
    private final SpaceflightNewsService newsService;

    public SpaceflightNewsController(SpaceflightNewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public Map<String, Object> getNews(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return newsService.getLatestNews(page, pageSize);
    }
} 