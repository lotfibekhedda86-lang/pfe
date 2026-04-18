<?php
include 'db_config.php';

// Function add product
function addProduct($name, $price, $quantity, $category, $seller_id, $image) {
    global $conn;
    $sql = "INSERT INTO products (name, price, quantity, category, seller_id, image) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    return $stmt->execute([$name, $price, $quantity, $category, $seller_id, $image]);
}

// Function get all products
function getAllProducts() {
    global $conn;
    $stmt = $conn->query("SELECT * FROM products");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>