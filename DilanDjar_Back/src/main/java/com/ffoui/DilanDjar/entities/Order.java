package com.ffoui.DilanDjar.entities;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public class Order {
    private int id;

    @NotNull(message = "L'Id utilisateur est obligatoire")
    private int userId;

    @Email(message = "L'email doit être valide")
    @NotNull(message = "L'email est obligatoire")
    private String email;

    public Order() {
    }

    public Order(int id, int userId, String email) {
        this.id = id;
        this.userId = userId;
        this.email = email;
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

    public void setId(int id) {
        this.id = id;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

