<?php
// order_functions.php
function createOrder($customer_id, $total_price) {
    global $conn;
    $sql = "INSERT INTO orders (customer_id, total_price, order_date) VALUES (?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$customer_id, $total_price]);
    return $conn->lastInsertId(); // Returns number of order 
}
?>