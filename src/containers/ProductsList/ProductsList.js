import React, {Component} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import axios from "axios";

class ProductsList extends Component {

    state = {
        searchText: "",
        products: {},
        cart: []
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

    cartAddHandler = (product) => {
        let newCart = [...this.state.cart];
        newCart.push(product);
        this.setState({cart: newCart});
    }

    render() {

        let allProducts = <p>There are no results for that search term.</p>;

        if (this.state.products.length > 0) {
            allProducts = this.state.products.map(product => {
                return (
                    <ProductCard 
                        key={product._id} 
                        product={product}
                        click={this.cartAddHandler}/>
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
                <ShoppingCart cart={this.state.cart} />
            </div>
        )
    }
}

export default ProductsList;

