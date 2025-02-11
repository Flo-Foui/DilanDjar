CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password varchar(255) not null,
    role varchar(50) not null
);

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    poster_path VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL CHECK (stock >= 0)
);

CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    email VARCHAR(255) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_item (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT REFERENCES orders(id),
    products_id INT REFERENCES products(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (products_id) REFERENCES products(id)
);
