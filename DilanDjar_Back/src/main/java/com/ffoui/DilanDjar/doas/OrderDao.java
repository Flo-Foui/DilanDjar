package com.ffoui.DilanDjar.doas;

import com.ffoui.DilanDjar.entities.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDao {
    private final JdbcTemplate jdbcTemplate;

    public OrderDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Order> orderRowMapper = (rs, _) -> new Order(
            rs.getInt("id"),
            rs.getInt("user_id"),
            rs.getString("email"),
            rs.getTimestamp("order_date").toLocalDateTime()
    );

    public List<Order> getAllOrders() {
        String sql = "SELECT * FROM orders";
        return jdbcTemplate.query(sql, orderRowMapper);
    }

    public List<Order> getOrdersByEmail(String email) {
        String sql = "SELECT * FROM products WHERE email = ?";
        return jdbcTemplate.query(sql, orderRowMapper, email);
    }

    public boolean createOrder(Order order) {
        String sql = "INSERT INTO orders (user_id, email, order_date) VALUES (?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, order.getUserId(), order.getEmail(), order.getOrderDate());
        return rowsAffected > 0;
    }

    public boolean deleteOrder(Integer id) {
        String sql = "DELETE FROM orders WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}