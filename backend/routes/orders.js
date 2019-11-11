const router = require("express").Router();
const Order = require("../models/order.js");

// INDEX ROUTE 
router.get("/", (req, res) => {
    Order.find({}, (err, foundOrders) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            res.json(foundOrders);
        }
    });
});

// CREATE ROUTE
router.post("/", (req, res) => {

    Order.create({
        name: req.body.name,
        products: req.body.products,
        totalCost: req.body.totalCost
    }, (err, newOrder) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            console.log(newOrder);
            res.json("Order posted!");
        }
    });
});

module.exports = router;