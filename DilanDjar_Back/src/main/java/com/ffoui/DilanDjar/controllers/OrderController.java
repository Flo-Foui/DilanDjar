package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.doas.OrderDao;
import com.ffoui.DilanDjar.entities.Order;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderDao orderDao;

    public OrderController(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderDao.getAllOrders();
    }

    @PostMapping
    public ResponseEntity<String> createOrder(@Valid @RequestBody Order order) {
        return orderDao.createOrder(order) ?
                ResponseEntity.ok("Order created")
                :
                ResponseEntity.badRequest().body("Order not created");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Integer id) {
        return orderDao.deleteOrder(id) ?
                ResponseEntity.ok("Order deleted")
                :
                ResponseEntity.badRequest().body("Order not deleted");
    }
}