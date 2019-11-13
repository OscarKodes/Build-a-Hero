import React, {Component} from "react";
import axios from "axios";
import OrderCard from "../../components/OrderCard/OrderCard";

class OrdersList extends Component {

    state = {
        orders: []
    }

    componentDidMount() {
        axios.get("http://localhost:5000/orders")
            .then(res => {
                this.setState({orders: res.data});
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
                    order={order} />
                )
            })
        }

        return (
            <div>
                <h1>Orders List</h1>
                {allOrders}
            </div>
        )
    }
}

export default OrdersList;

