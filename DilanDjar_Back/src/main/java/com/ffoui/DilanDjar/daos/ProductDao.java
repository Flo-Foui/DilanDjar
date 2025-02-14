package com.ffoui.DilanDjar.daos;

import com.ffoui.DilanDjar.entities.Product;
import com.ffoui.DilanDjar.exceptions.DuplicateResourceException;
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

    private final RowMapper<Product> productRowMapper = (rs, rowNum) -> {
        Product product = new Product();
        product.setId(rs.getInt("id"));
        product.setName(rs.getString("name"));
        product.setDescription(rs.getString("description"));
        product.setPosterPath(rs.getString("poster_path"));
        product.setPrice(rs.getDouble("price"));
        product.setStock(rs.getInt("stock"));
        return product;
    };

    public List<Product> getAllProducts() {
        String sql = "SELECT * FROM products";
        return jdbcTemplate.query(sql, productRowMapper);
    }

    public Product getProductById(int id) {
        String sql = "SELECT * FROM products WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, productRowMapper, id);
    }

    public boolean addProduct(Product product) {
        if (productExistsByName(product.getName())) {
            throw new DuplicateResourceException("Produit avec le nom : " + product.getName() + " existe déjà");
        }
        String sql = "INSERT INTO products (name, description, poster_path, price, stock) VALUES (?, ?, ?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, product.getName(), product.getDescription(), product.getPosterPath(), product.getPrice(), product.getStock());
        return rowsAffected > 0;
    }

    public int updateProduct(Product product) {
        String sql = "UPDATE products SET name = ?, description = ?, poster_path = ?, price = ?, stock = ? WHERE id = ?";
        return jdbcTemplate.update(sql, product.getName(), product.getDescription(), product.getPosterPath(), product.getPrice(), product.getStock(), product.getId());
    }

    public int deleteProduct(int id) {
        String sql = "DELETE FROM products WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public void updateStock(int productId, int quantity) {
        String sql = "UPDATE products SET stock = GREATEST(stock - ?, 0) WHERE id = ?";
        jdbcTemplate.update(sql, quantity, productId);
    }

    public boolean productExistsById(int productId) {
        String sql = "SELECT EXISTS (SELECT 1 FROM products WHERE id = ?)";
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject(sql, Boolean.class, productId));
    }

    public boolean productExistsByName(String name) {
        String sql = "SELECT COUNT(*) FROM products WHERE name = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, name);
        return count != null && count > 0;
    }

}
