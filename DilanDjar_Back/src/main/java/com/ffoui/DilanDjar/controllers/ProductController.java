package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.doas.ProductDao;
import com.ffoui.DilanDjar.entities.Product;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductDao productDao;

    public ProductController(ProductDao productDao) {
        this.productDao = productDao;
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productDao.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(productDao.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<String> createProduct(@Valid @RequestBody Product product) {
        return productDao.createProduct(product) ?
                ResponseEntity.ok("Product created")
                :
                ResponseEntity.badRequest().body("Product not created");
    }

    @PutMapping
    public ResponseEntity<String> updateProduct(@Valid @RequestBody Product product) {
        return productDao.updateProduct(product.getId(), product) ?
                ResponseEntity.ok("Product updated")
                :
                ResponseEntity.badRequest().body("Product not updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        return productDao.deleteProduct(id) ?
                ResponseEntity.ok("Product deleted")
                :
                ResponseEntity.badRequest().body("Product not deleted");
    }
}