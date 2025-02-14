package com.ffoui.DilanDjar.daos;

import com.ffoui.DilanDjar.entities.Order;
import com.ffoui.DilanDjar.exceptions.ResourceNotFoundException;
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
            rs.getString("email")
    );

    public List<Order> getAllOrders() {
        String sql = "SELECT * FROM orders";
        return jdbcTemplate.query(sql, orderRowMapper);
    }

    public List<Order> getOrdersByEmail(String email) {
        String sql = "SELECT * FROM orders WHERE email = ?";
        List<Order> orders = jdbcTemplate.query(sql, orderRowMapper, email);

        if (orders.isEmpty()) {
            throw new ResourceNotFoundException("Aucune commande trouvée pour l'Email : " + email);
        }

        return orders;
    }

    private boolean orderExistsById(Integer id) {
        String checkSql = "SELECT COUNT(*) FROM orders WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class, id);
        return count != null && count > 0;
    }

    public boolean createOrder(Order order) {
        String sql = "INSERT INTO orders (user_id) VALUES (?)";
        int rowsAffected = jdbcTemplate.update(sql, order.getUserId());
        return rowsAffected > 0;
    }

    public boolean deleteOrder(Integer id) {
        if (!orderExistsById(id)) {
            throw new ResourceNotFoundException("Commande avec l'ID : " + id + " n'existe pas");
        }

        String sql = "DELETE FROM orders WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}