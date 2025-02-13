package com.ffoui.DilanDjar.doas;

import com.ffoui.DilanDjar.entities.Product;
import com.ffoui.DilanDjar.exceptions.ResourceNotFoundException;
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
            rs.getString("poster_path"),
            rs.getDouble("price"),
            rs.getInt("stock")
    );

    public List<Product> getAllProducts() {
        String sql = "SELECT * FROM products";
        return jdbcTemplate.query(sql, productRowMapper);
    }

    public Product getProductById(Integer id) {
        String sql = "SELECT * FROM products WHERE id = ?";
        return jdbcTemplate.query(sql, productRowMapper, id)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Produit avec l'Id : " + id + " n'existe pas"));
    }

    private boolean productExistsByName(String name) {
        String checkSql = "SELECT COUNT(*) FROM products WHERE name = ?";
        Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class, name);
        return count != null && count > 0;
    }

    public boolean createProduct(Product product) {
        if (productExistsByName(product.getName())) {
            throw new ResourceNotFoundException("Produit avec le nom : " + product.getName() + " existe déjà");
        }

        String sql = "INSERT INTO products (name, description, poster_path, price, stock) VALUES (?, ?, ?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, product.getName(), product.getDescription(), product.getPosterPath(), product.getPrice(), product.getStock());
        return rowsAffected > 0;
    }

    private boolean productExistsById(Integer id) {
        String checkSql = "SELECT COUNT(*) FROM products WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class, id);
        return count != null && count > 0;
    }

    public boolean updateProduct(Integer id, Product product) {
        if (!productExistsById(id)) {
            throw new ResourceNotFoundException("Produit avec l'ID : " + id + " n'existe pas");
        }

        String sql = "UPDATE products SET description = ?, poster_path = ?, price = ?, stock = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, product.getDescription(), product.getPosterPath(), product.getPrice(), product.getStock(), id);

        if (rowsAffected <= 0) {
            throw new RuntimeException("Échec de la mise à jour du produit avec l'ID : " + id);
        }
        return true;
    }

    public boolean deleteProduct(Integer id) {
        if (!productExistsById(id)) {
            throw new ResourceNotFoundException("Produit avec l'ID : " + id + " n'existe pas");
        }

        String sql = "DELETE FROM products WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}