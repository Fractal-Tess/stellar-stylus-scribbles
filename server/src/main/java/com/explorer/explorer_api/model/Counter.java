package com.explorer.explorer_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Counter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int value;

    public Counter() {}
    public Counter(int value) { this.value = value; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getValue() { return value; }
    public void setValue(int value) { this.value = value; }
} 