<?php
class Product {
    public $id;
    public $name;
    public $price;
    public $quantity;
    public $category;
    public $seller_id;
    public $image_path;

    public function __construct($id, $name, $price, $quantity, $category, $seller_id, $image_path) {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->category = $category;
        $this->seller_id = $seller_id;
        $this->image_path = $image_path;
    }
}
?>