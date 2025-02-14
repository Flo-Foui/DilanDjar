package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.daos.OrderDao;
import com.ffoui.DilanDjar.entities.Order;
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

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable int id) {
        return orderDao.getOrderById(id);
    }

    @GetMapping("/search")
    public List<Order> getOrdersByEmail(@RequestParam String email) {
        return orderDao.getOrdersByEmail(email);
    }

    @PostMapping
    public void createOrder(@RequestBody Order order) {
        orderDao.createOrder(order);
    }
}
