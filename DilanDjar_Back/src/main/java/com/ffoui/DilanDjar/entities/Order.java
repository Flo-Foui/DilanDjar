package com.ffoui.DilanDjar.entities;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class Order {
    private int id;

    @NotNull(message = "L'Id utilisateur est obligatoire")
    private int userId;

    @Email(message = "L'email doit être valide")
    @NotNull(message = "L'email est obligatoire")
    private String email;
    private LocalDateTime orderDate;

    public Order() {}

    public Order(int id, int userId, String email, LocalDateTime orderDate) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.orderDate = (orderDate != null) ? orderDate : LocalDateTime.now();
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

