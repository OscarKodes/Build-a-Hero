import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import ProductCard from "./ProductCard/ProductCard";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

const productsList = () => (
    <div>
        <ShoppingCart />
        <SearchBar />
        <h1>Products List</h1>
        <ProductCard />
    </div>
)

export default productsList;

