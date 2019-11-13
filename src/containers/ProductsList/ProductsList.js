import React, {Component} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import axios from "axios";

class ProductsList extends Component {

    state = {
        searchText: "",
        products: {},
        cart: [],
        totalCost: 0,
        heroName: "",
        showCart: false
    }

    componentDidMount() {
        axios.get("http://localhost:5000/products/search/?keyword=")
            .then(res => {
                this.setState({products: res.data});
            });
    }

    searchTextChangeHandler = (event) => {
        this.setState({searchText: event.target.value})
    }

    submitSearchTextHandler = (event) => {
        event.preventDefault();

        axios.get("http://localhost:5000/products/search/?keyword=" + this.state.searchText)
            .then(res => this.setState({products: res.data}));
    }

    cartToggleHandler = () => {
        this.setState((prevState) => {
            return {showCart: !prevState.showCart}
        });
    }

    heroNameChangeHandler = (event) => {
        this.setState({heroName: event.target.value});
    }

    cartAddHandler = (product) => {
        // // Remove product from current list of shown products
        // let productIdx = this.state.products.indexOf(product);
        // let newProducts = this.state.products;
        // newProducts.splice(productIdx, 1); 

        // Add price and the clicked product to the cart
        let newPrice = this.state.totalCost + product.price;
        let newCart = [...this.state.cart];
        newCart.push(product);
        this.setState({
            // products: newProducts,
            cart: newCart,
            totalCost: newPrice
        });
    }

    cartRemoveHandler = (product) => {
        // // Add the product back into the list of products
        // let newProducts = [product, ...this.state.products];

        // Splice the product out of the cart list
        let newCart = [...this.state.cart];
        let idx = newCart.indexOf(product);
        newCart.splice(idx, 1);

        // Subtract the price
        let newPrice = this.state.totalCost - product.price;
        this.setState({
            // products: newProducts,
            cart: newCart,
            totalCost: newPrice
        });
    }

    purchaseHandler = () => {

        let purchasedHero = {
            name: this.state.heroName,
            products: this.state.cart,
            totalCost: this.state.totalCost
        }

        axios.post("http://localhost:5000/orders", purchasedHero)
            .then(res => console.log(res.data));

        window.location = "/orders";
    }

    render() {

        let allProducts = <p>There are no results for that search term.</p>;

        if (this.state.products.length > 0) {
            allProducts = this.state.products.map(product => {
                return (
                    <ProductCard 
                        key={product._id} 
                        product={product}
                        addHandler={this.cartAddHandler}/>
                )
            })
        }

        return (
            <div>
                <h1>Products List</h1>
                <p>{this.state.cart.length} Item(s) in Cart</p>
                <button onClick={this.cartToggleHandler}>Show Shopping Cart</button>
                <SearchBar 
                    searchText={this.state.searchText}
                    onChangeHandler={this.searchTextChangeHandler}
                    onSubmitHandler={this.submitSearchTextHandler}>
                    Search Products
                </SearchBar>
                {allProducts}
                <ShoppingCart 
                    cart={this.state.cart}
                    showCart={this.state.showCart}
                    totalCost={this.state.totalCost}
                    removeHandler={this.cartRemoveHandler}
                    purchaseHandler={this.purchaseHandler}
                    heroNameChangeHandler={this.heroNameChangeHandler} />
            </div>
        )
    }
}

export default ProductsList;

