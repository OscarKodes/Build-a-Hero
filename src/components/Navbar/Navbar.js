import React from 'react';
import {Link} from 'react-router-dom';
 
const navbar = () => (
 
    <nav className="navbar navbar-dark bg-primary">
        <Link to="/products" className="navbar-brand">Build-a-Hero</Link>
        <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
                <Link to="/products" className="nav-link">Products</Link>
            </li>
            <li className="navbar-item">
                <Link to="/orders" className="nav-link">Orders</Link>
            </li>
        </ul>
    </nav>
)

export default navbar;