<?php

class Customer {
    public $id_customer;
    public $first_name;
    public $last_name;
    public $email;
    public $password;
    public $role;
    public $phone_number;
    public $address;
    public $city;

    public function __construct($data = []) {
        $this->id_customer = $data['id_customer'] ?? null;
        $this->first_name = $data['first_name'] ?? null;
        $this->last_name = $data['last_name'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->phone_number = $data['phone_number'] ?? null;
        $this->address = $data['address'] ?? null;
        $this->city = $data['city'] ?? null;
    }


    public function getFullName() {
        return $this->first_name . " " . $this->last_name;
    }

public function isFarmer() {
    if (empty($this->role)) {
        return false;
    }
    return in_array(strtolower($this->role), ['farmer', 'seller']);
}
}
?>