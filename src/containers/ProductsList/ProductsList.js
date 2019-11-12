import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";

const productsList = () => (
    <div>
        <ShoppingCart />
        <SearchBar />
        <h1>Products List</h1>
        <ProductCard />
    </div>
)

export default productsList;

