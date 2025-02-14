package com.ffoui.DilanDjar.entities;

import jakarta.validation.constraints.*;

public class OrderItem {
    private int id;

    @NotNull(message = "L'Id de la commande est obligatoire")
    private int orderId;

    @NotNull(message = "L'Id du produit est obligatoire")
    private int productId;

    @Min(value = 1, message = "La quantité minimale doit être de 1")
    private int quantity;

    public OrderItem() {}

    public OrderItem(int id, int orderId, int productId, int quantity) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public int getOrderId() {
        return orderId;
    }

    public int getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
