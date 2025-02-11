package com.ffoui.DilanDjar.entities;

import java.time.LocalDateTime;
import java.util.List;

public class Order {
    private int id;
    private int userId;
    private String email;
    private LocalDateTime orderDate;

    public Order() {}

    public Order(int id, int userId, String email, LocalDateTime orderDate) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.orderDate = orderDate;
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}

