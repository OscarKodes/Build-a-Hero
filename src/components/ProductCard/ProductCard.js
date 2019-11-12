import React from "react";

const ProductCard = (props) => (
    <div className="border m-2 p-2 shadow">
        <p>{props.product.title}</p>
        <p>{props.product.description}</p>
        <p>{props.product.price}</p>
        <button onClick={() => props.click(props.product)}>Add to Cart</button>
    </div>
)

export default ProductCard;

