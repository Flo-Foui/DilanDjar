package com.ffoui.DilanDjar.daos;

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

    private final RowMapper<Order> orderRowMapper = (rs, rowNum) -> {
        Order order = new Order();
        order.setId(rs.getInt("id"));
        order.setUserId(rs.getInt("user_id"));
        return order;
    };

    public List<Order> getAllOrders() {
        String sql = "SELECT * FROM orders";
        return jdbcTemplate.query(sql, orderRowMapper);
    }

    public Order getOrderById(int id) {
        String sql = "SELECT * FROM orders WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, orderRowMapper, id);
    }

    public List<Order> getOrdersByEmail(String email) {
        String sql = "SELECT orders.* FROM orders JOIN user ON orders.user_id = user.id WHERE u.email = ?";
        return jdbcTemplate.query(sql, orderRowMapper, email);
    }

    public int createOrder(Order order) {
        String sql = "INSERT INTO orders (user_id) VALUES (?)";
        return jdbcTemplate.update(sql, order.getUserId());
    }
}
