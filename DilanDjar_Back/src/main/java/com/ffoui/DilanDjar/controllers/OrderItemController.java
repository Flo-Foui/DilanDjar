package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.daos.OrderItemDao;
import com.ffoui.DilanDjar.entities.OrderItem;
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

    @GetMapping("/{id}")
    public OrderItem getOrderItemById(@PathVariable int id) {
        return orderItemDao.getOrderItemById(id);
    }

    @PostMapping
    public int createOrderItem(@RequestBody OrderItem orderItem) {
         return orderItemDao.createOrderItem(orderItem);
    }

    @DeleteMapping("/{id}")
    public int deleteOrderItem(@PathVariable int id) {
        return orderItemDao.deleteOrderItem(id);
    }
}
