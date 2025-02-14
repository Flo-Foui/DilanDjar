package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.daos.ProductDao;
import com.ffoui.DilanDjar.entities.Product;
import org.springframework.http.HttpStatus;
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

    @GetMapping
    public List<Product> getAllProducts() {
        return productDao.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id) {
        return productDao.getProductById(id);
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            if (productDao.productExistsByName(product.getName())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Produit avec le nom " + product.getName() + " existe déjà.");
            }
            productDao.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body("Produit ajouté avec succès !");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'ajout du produit : " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public void updateProduct(@PathVariable int id, @RequestBody Product product) {
        product.setId(id);
        productDao.updateProduct(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        productDao.deleteProduct(id);
    }
}
