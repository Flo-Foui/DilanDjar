package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.daos.OrderDao;
import com.ffoui.DilanDjar.daos.ProductDao;
import com.ffoui.DilanDjar.entities.Order;
import com.ffoui.DilanDjar.entities.OrderItem;
import com.ffoui.DilanDjar.entities.Product;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderDao orderDao;
    private final ProductDao productDao;

    public OrderController(OrderDao orderDao, ProductDao productDao) {
        this.orderDao = orderDao;
        this.productDao = productDao;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderDao.getAllOrders();
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Order>> getOrdersByEmail(@PathVariable String email) {
        return ResponseEntity.ok(orderDao.getOrdersByEmail(email));
    }

    /*@PostMapping
    public ResponseEntity<String> createOrder(@Valid @RequestBody Order order) {
        // Vérification du stock pour chaque produit de la commande
        for (OrderItem item : order.getOrderItems()) {
            Product product = productDao.getProductById(item.getProductId());

            if (product == null) {
                return ResponseEntity.badRequest().body("Produit introuvable");
            }

            if (product.getStock() < item.getQuantity()) {
                return ResponseEntity.badRequest().body("Stock insuffisant pour le produit : " + product.getName());
            }
        }

        // Si tout est OK, on crée la commande
        boolean orderCreated = orderDao.createOrder(order);

        if (orderCreated) {
            // Mise à jour du stock après validation
            for (OrderItem item : order.getOrderItems()) {
                productDao.updateStock(item.getProductId(), item.getQuantity());
            }
            return ResponseEntity.ok("Commande créée avec succès !");
        } else {
            return ResponseEntity.badRequest().body("Erreur lors de la création de la commande");
        }
    }*/


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Integer id) {
        return orderDao.deleteOrder(id) ?
                ResponseEntity.ok("Order deleted")
                :
                ResponseEntity.badRequest().body("Order not deleted");
    }
}