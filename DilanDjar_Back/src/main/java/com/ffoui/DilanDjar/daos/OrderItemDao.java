package com.ffoui.DilanDjar.daos;

import com.ffoui.DilanDjar.entities.OrderItem;
import com.ffoui.DilanDjar.exceptions.ResourceNotFoundException;
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
            rs.getInt("products_id"),
            rs.getInt("quantity")
    );

    public List<OrderItem> getAllOrderItems() {
        String sql = "SELECT * FROM order_item";
        return jdbcTemplate.query(sql, orderItemRowMapper);
    }

    public List<OrderItem> getOrderItemsByEmail(String email) {
        String sql = """
        SELECT oi.* FROM order_item oi
        JOIN orders o ON oi.order_id = o.id
        WHERE o.email = ?
    """;
        return jdbcTemplate.query(sql, orderItemRowMapper, email);
    }

    private boolean orderExists(int orderId) {
        String sql = "SELECT COUNT(*) FROM orders WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, orderId);
        return count != null && count > 0;
    }

    public boolean createOrderItem(OrderItem orderItem) {
        /*if (!orderExists(id)) {
            throw new ResourceNotFoundException("Commande avec l'ID " + id + " introuvable");
        }*/

        String sql = "INSERT INTO order_item (order_id, products_id, quantity) VALUES (?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, orderItem.getOrderId(), orderItem.getProductId(), orderItem.getQuantity());
        return rowsAffected > 0;
    }

    public boolean deleteOrderItem(Integer id) {
        if (!orderExists(id)) {
            throw new ResourceNotFoundException("Commande avec l'ID " + id + " introuvable");
        }
        String sql = "DELETE FROM order_item WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}
