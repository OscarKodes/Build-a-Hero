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
        heroName: ""
    }

    componentDidMount() {
        axios.get("http://localhost:5000/products/search/?keyword=")
            .then(res => {
                this.setState({products: res.data});
            });
    }

    textChangeHandler = (event) => {
        this.setState({searchText: event.target.value})
    }

    submitTextHandler = (event) => {
        event.preventDefault();

        axios.get("http://localhost:5000/products/search/?keyword=" + this.state.searchText)
            .then(res => {
                this.setState({products: res.data});
            });
    }

    heroNameChangeHandler = (event) => {
        this.setState({heroName: event.target.value});
    }

    cartAddHandler = (product) => {
        let newCart = [...this.state.cart];
        newCart.push(product);
        let newPrice = this.state.totalCost + product.price;
        this.setState({
            cart: newCart,
            totalCost: newPrice
        });
    }

    cartRemoveHandler = (product) => {
        let newCart = [...this.state.cart];
        let idx = newCart.indexOf(product);
        newCart.splice(idx, 1);
        let newPrice = this.state.totalCost - product.price;
        this.setState({
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
                <SearchBar 
                    searchText={this.state.searchText}
                    onChangeHandler={this.textChangeHandler}
                    onSubmitHandler={this.submitTextHandler} />
                {allProducts}
                <ShoppingCart 
                    cart={this.state.cart}
                    totalCost={this.state.totalCost}
                    removeHandler={this.cartRemoveHandler}
                    purchaseHandler={this.purchaseHandler}
                    heroNameChangeHandler={this.heroNameChangeHandler} />
            </div>
        )
    }
}

export default ProductsList;

