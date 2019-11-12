import React from "react";

const shoppingCart = (props) => {

    let allCart = null;

    if (props.cart.length > 0) {
        allCart = props.cart.map(product => {
            return (
                <div key={product._id}>
                    <p>
                        {product.title}
                    </p>
                </div>
            )
        })
    }

    return (
        <div>
            <h3>Shopping Cart</h3>
            {allCart}
        </div>
    )
}

export default shoppingCart;

