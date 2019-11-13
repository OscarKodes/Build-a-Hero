import React, {Component} from "react";

class shoppingCart extends Component {

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.showCart !== this.props.showCart) {
            return true;
        } 
        
        else if (this.props.showCart && nextProps.cart !== this.props.cart) {
            return true;
        }

        return false;
    }

    componentDidUpdate() {
        console.log("cart updated");
    }

    render () {
        let allCart = null;

        if (this.props.cart.length > 0) {
            allCart = this.props.cart.map(product => {
                return (
                    <div key={product._id}>
                        <p>
                            {product.title} - {product.price}
                        </p>
                        <button onClick={() => this.props.removeHandler(product)}>Remove</button>
                    </div>
                )
            })
        }

        let divClasses = this.props.showCart ? "border p-2 m-2 shadow-lg" : "border p-2 m-2 shadow-lg d-none";

        return (
            <div className={divClasses}>
                <h3>Shopping Cart</h3>           
                <input 
                    type="text" 
                    placeholder="Hero Name" 
                    value={this.props.heroName} 
                    onChange={this.props.heroNameChangeHandler} />
                {allCart}
                <strong>Grand Total: {this.props.totalCost}</strong>
                <button onClick={this.props.purchaseHandler}>Purchase</button>
            </div>
        )
    }
}

export default shoppingCart;

