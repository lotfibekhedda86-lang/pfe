<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['firstName']   ?? ''; 
    $last_name  = $_POST['lastName']    ?? '';
    $email      = $_POST['email']       ?? '';
    $username   = $_POST['username']    ?? ''; 
    $password   = $_POST['password']    ?? '';
    $phone      = $_POST['PhoneNumber'] ?? ''; 

    if (isset($conn)) {
        try {
            $sql = "INSERT INTO customers (first_name, last_name, email, username, password, phone_number) 
                    VALUES (?, ?, ?, ?, ?, ?)";
            
            $stmt = $conn->prepare($sql);
            $stmt->execute([$first_name, $last_name, $email, $username, $password, $phone]);

            header("Location: login.html?success=1");
            exit();

        } catch (PDOException $e) {
            die(" Erro on data base  : " . $e->getMessage());
        }
    }
}
?>