import React from "react";

const shoppingCart = (props) => {

    let allCart = null;

    if (props.cart.length > 0) {
        allCart = props.cart.map(product => {
            return (
                <div key={product._id}>
                    <p>
                        {product.title} - {product.price}
                    </p>
                    <button onClick={() => props.removeHandler(product)}>Remove</button>
                </div>
            )
        })
    }

    return (
        <div>
            <h3>Shopping Cart</h3>
            <input 
                type="text" 
                placeholder="Hero Name" 
                value={props.heroName} 
                onChange={props.heroNameChangeHandler} />
            {allCart}
            <strong>Grand Total: {props.totalCost}</strong>
            <button onClick={props.purchaseHandler}>Purchase</button>
        </div>
    )
}

export default shoppingCart;

