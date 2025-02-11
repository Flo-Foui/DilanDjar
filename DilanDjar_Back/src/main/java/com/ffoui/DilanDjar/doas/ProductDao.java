package com.ffoui.DilanDjar.doas;

import com.ffoui.DilanDjar.entities.Product;
import com.ffoui.DilanDjar.entities.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductDao {
    private final JdbcTemplate jdbcTemplate;

    public ProductDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Product> productRowMapper = (rs, _) -> new Product(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("description"),
            rs.getDouble("price"),
            rs.getInt("stock")
    );

    public List<Product> getAllProducts() {
        String sql = "SELECT * FROM product";
        return jdbcTemplate.query(sql, productRowMapper);
    }

    public Product getProductById(int id) {
        String sql = "SELECT * FROM product WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, productRowMapper, id);
    }

    public boolean createProduct(Product product) {
        String sql = "INSERT INTO product (name, description, price, stock) VALUES (?, ?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, product.getName(), product.getDescription(), product.getPrice(), product.getStock());
        return rowsAffected > 0;
    }

    public boolean updateProduct(Product product) {
        String sql = "UPDATE product SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, product.getName(), product.getDescription(), product.getPrice(), product.getStock(), product.getId());
        return rowsAffected > 0;
    }

    public boolean deleteProduct(int id) {
        String sql = "DELETE FROM product WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}