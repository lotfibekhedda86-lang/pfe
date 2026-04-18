<?php
$host = "localhost";
$port= "3307";
$db_name = "produits_agricole_db"; 
$username = "root";
$password = ""; 

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    echo "Eroor connecting" . $exception->getMessage();
}
?>