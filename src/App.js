import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.css';
import OrdersList from './components/OrdersList/OrdersList';
import ProductsList from './components/ProductsList/ProductsList';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/products" component={ProductsList} />
        <Route path="/orders" component={OrdersList} />
      </div>
    </Router>
  );
}

export default App;
