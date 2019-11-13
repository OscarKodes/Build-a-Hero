import React, {Component} from "react";
import axios from "axios";
import OrderCard from "../../components/OrderCard/OrderCard";
import SearchBar from "../../components/SearchBar/SearchBar";

class OrdersList extends Component {

    state = {
        orders: [],
        searchText: ""
    }

    componentDidMount() {
        axios.get("http://localhost:5000/orders/search/?keyword=")
            .then(res => {
                this.setState({orders: res.data});
            });
    }

    searchTextChangeHandler = (event) => {
        this.setState({searchText: event.target.value})
    }

    submitSearchTextHandler = (event) => {
        event.preventDefault();

        axios.get("http://localhost:5000/orders/search/?keyword=" + this.state.searchText)
            .then(res => {
                this.setState({orders: res.data});
            });
    }

    deleteOrderHandler = (orderId) => {

        axios.delete("http://localhost:5000/orders/" + orderId)
            .then(res => console.log(res.data));
        this.setState({
            orders: this.state.orders.filter(order => order._id !== orderId)
        });
    }

    render () {

        let allOrders = null;
        
        if (this.state.orders.length > 0) {

            let ordersSortedByTime = this.state.orders.sort((a, b) => {
                                            a = new Date(a.updatedAt).getTime();
                                            b = new Date(b.updatedAt).getTime();
                                            return b-a;
                                        });

            allOrders = ordersSortedByTime.map(order => {
                return (
                <OrderCard 
                    key={order._id} 
                    order={order}
                    onClickHandler={this.deleteOrderHandler} />
                )
            })
        }

        return (
            <div>
                <h1>Orders List</h1>
                <SearchBar
                    onChangeHandler={this.searchTextChangeHandler}
                    searchText={this.state.searchText}
                    onSubmitHandler={this.submitSearchTextHandler}>
                    Search Order
                </SearchBar>
                {allOrders}
            </div>
        )
    }
}

export default OrdersList;

