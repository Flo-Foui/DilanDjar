package com.ffoui.DilanDjar.daos;

import com.ffoui.DilanDjar.entities.OrderItem;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class OrderItemDao {
    private final JdbcTemplate jdbcTemplate;

    public OrderItemDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<OrderItem> orderItemRowMapper = (rs, rowNum) -> {
        OrderItem orderItem = new OrderItem();
        orderItem.setId(rs.getInt("id"));
        orderItem.setOrderId(rs.getInt("order_id"));
        orderItem.setProductId(rs.getInt("products_id"));
        orderItem.setQuantity(rs.getInt("quantity"));
        return orderItem;
    };

    public List<OrderItem> getAllOrderItems() {
        String sql = "SELECT * FROM order_item";
        return jdbcTemplate.query(sql, orderItemRowMapper);
    }

    public OrderItem getOrderItemById(int id) {
        String sql = "SELECT * FROM order_item WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, orderItemRowMapper, id);
    }

    public int createOrderItem(OrderItem orderItem) {
        String sql = "INSERT INTO order_item (order_id, products_id, quantity) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, orderItem.getOrderId(), orderItem.getProductId(), orderItem.getQuantity());
    }

    public int deleteOrderItem(int id) {
        String sql = "DELETE FROM order_item WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
