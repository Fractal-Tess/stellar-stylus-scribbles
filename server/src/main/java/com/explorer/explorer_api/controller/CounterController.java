package com.explorer.explorer_api.controller;

import com.explorer.explorer_api.model.Counter;
import com.explorer.explorer_api.service.CounterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/counter")
public class CounterController {
    private final CounterService counterService;

    public CounterController(CounterService counterService) {
        this.counterService = counterService;
    }

    @GetMapping
    public ResponseEntity<Counter> getCounter() {
        return ResponseEntity.ok(counterService.getCounter());
    }

    @PostMapping("/increment")
    public ResponseEntity<Counter> incrementCounter() {
        return ResponseEntity.ok(counterService.incrementCounter());
    }

    @PostMapping("/reset")
    public ResponseEntity<Counter> resetCounter() {
        return ResponseEntity.ok(counterService.resetCounter());
    }
} 