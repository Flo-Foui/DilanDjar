package com.ffoui.DilanDjar.entities;

import jakarta.validation.constraints.NotNull;

public class Order {
    private int id;

    @NotNull(message = "L'Id utilisateur est obligatoire")
    private int userId;

    public Order() {
    }

    public Order(int id, int userId) {
        this.id = id;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }
    
    public void setId(int id) {
        this.id = id;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

}

