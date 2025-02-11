package com.ffoui.DilanDjar.doas;

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

    private final RowMapper<OrderItem> orderItemRowMapper = (rs, _) -> new OrderItem(
            rs.getInt("id"),
            rs.getInt("order_id"),
            rs.getInt("product_id"),
            rs.getInt("quantity")
    );

    public List<OrderItem> getAllOrderItems() {
        String sql = "SELECT * FROM order_item";
        return jdbcTemplate.query(sql, orderItemRowMapper);
    }

    public OrderItem getOrderById(int id) {
        String sql = "SELECT * FROM user WHERE id = ?";
        return jdbcTemplate.query(sql, orderItemRowMapper, id)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Commande avec l'Id : " + id + " n'existe pas"));
    }

    public boolean createOrderItem(OrderItem orderItem) {
        String sql = "INSERT INTO order_item (order_id, product_id, quantity) VALUES (?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, orderItem.getOrderId(), orderItem.getProductId(), orderItem.getQuantity());
        return rowsAffected > 0;
    }

    public boolean deleteOrderItem(int id) {
        String sql = "DELETE FROM order_item WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}
