package com.explorer.explorer_api.service;

import com.explorer.explorer_api.model.Counter;
import com.explorer.explorer_api.repository.CounterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CounterService {
    private final CounterRepository counterRepository;

    public CounterService(CounterRepository counterRepository) {
        this.counterRepository = counterRepository;
    }

    public Counter getCounter() {
        return counterRepository.findAll().stream().findFirst().orElseGet(() -> counterRepository.save(new Counter(0)));
    }

    @Transactional
    public Counter incrementCounter() {
        Counter counter = getCounter();
        counter.setValue(counter.getValue() + 1);
        return counterRepository.save(counter);
    }

    @Transactional
    public Counter resetCounter() {
        Counter counter = getCounter();
        counter.setValue(0);
        return counterRepository.save(counter);
    }
} 