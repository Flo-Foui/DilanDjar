package com.ffoui.DilanDjar.entities;

import jakarta.validation.constraints.*;

public class Product {
    private int id;

    @NotBlank(message = "Le nom du produit est obligatoire")
    private String name;
    private String description;
    private String posterPath;

    @NotNull(message = "Le prix est ne peut pas être Null")
    @Min(value = 0, message = "Le prix ne peut pas être négatif")
    private Double price;

    @Min(value = 0, message = "Le stock ne peut pas être négatif")
    private int stock;

    public Product() {}

    public Product(int id, String name, String description, String posterPath, Double price, int stock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.posterPath = posterPath;
        this.price = price;
        this.stock = stock;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getPosterPath() {return posterPath;}

    public Double getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPosterPath(String posterPath) {this.posterPath = posterPath;}

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
