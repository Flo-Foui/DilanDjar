package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.daos.OrderItemDao;
import com.ffoui.DilanDjar.entities.OrderItem;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-items")
public class OrderItemController {
    private final OrderItemDao orderItemDao;

    public OrderItemController(OrderItemDao orderItemDao) {
        this.orderItemDao = orderItemDao;
    }

    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemDao.getAllOrderItems();
    }

    @GetMapping("/{email}")
    public List<OrderItem> getOrderItemsByEmail(@PathVariable String email) {
        return orderItemDao.getOrderItemsByEmail(email);
    }

    @PostMapping
    public ResponseEntity<String> createOrderItem(@Valid @RequestBody OrderItem orderItem) {
        return orderItemDao.createOrderItem(orderItem) ?
                ResponseEntity.ok("OrderItem created")
                :
                ResponseEntity.badRequest().body("OrderItem not created");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderItem(@PathVariable Integer id) {
        return orderItemDao.deleteOrderItem(id) ?
                ResponseEntity.ok("OrderItem deleted")
                :
                ResponseEntity.badRequest().body("OrderItem not deleted");
    }
}