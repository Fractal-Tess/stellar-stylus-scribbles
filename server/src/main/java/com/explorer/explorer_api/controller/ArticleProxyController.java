package com.explorer.explorer_api.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.net.URI;

@RestController
@RequestMapping("/api/article")
public class ArticleProxyController {

    @GetMapping("/extract")
    public ResponseEntity<?> extractArticleText(@RequestParam String url) {
        try {
            // Validate URL
            new URI(url);
            System.out.println("URL: " + url);

            // Fetch and parse the HTML
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (compatible; ArticleExtractor/1.0)")
                    .timeout(10_000)
                    .get();

            // Try to extract main content
            Element main = doc.selectFirst("article");
            if (main == null) {
                main = doc.selectFirst("main");
            }
            if (main == null) {
                main = doc.body();
            }

            String text = main != null ? main.text() : "No main content found.";

            return ResponseEntity.ok(new ArticleTextResponse(text));

        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().body("Invalid URL.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch or parse article: " + e.getMessage());
        }
    }

    // Simple DTO for JSON response
    public record ArticleTextResponse(String text) {}
} 