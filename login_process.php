<?php
session_start();
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM customers WHERE email = ? AND password = ?");

// Send real values
$stmt->execute([$email, $password]);

// Get result 
$user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Storage data (session)
            $_SESSION['user_id'] = $user['id_customer'];
            $_SESSION['user_name'] = $user['first_name'];

            // Data True go to main
            header("Location: main.html");
            exit();
        } else {
            // Data False 
            header("Location: login.html?error=invalid");
            exit();
        }
    }
}
?>