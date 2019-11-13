import React from "react";

const OrderCard = (props) => {

    const updatedTime = new Date(props.order.updatedAt);
    const options = { 
        hour: 'numeric', 
        minute: 'numeric',
        month: 'short', 
        day: 'numeric'
    };
    const updatedTimeStr = updatedTime.toLocaleDateString("us-EN", options);
    let allProducts = null;

    if (props.order.products.length > 0) {
        allProducts = props.order.products.map(product => {
            return (
                <p key={props.order.name + product._id}>{product.title} - {product.price}</p>
            )
        })
    }

    return (
        <div className="border m-2 p-2 shadow">
            <p>
                <em>
                Updated at {updatedTimeStr}
                </em>
            </p>

            <p>Hero Name: {props.order.name}</p>
            {allProducts}
            <strong>Grand Total: {props.order.totalCost}</strong>
            <button onClick={() => props.onClickHandler(props.order._id)}>Delete Order</button>
        </div>
    )

}

export default OrderCard;

