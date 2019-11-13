const router = require("express").Router();
const Order = require("../models/order.js");

// INDEX ROUTE 
router.get("/", (req, res) => {
    Order.
    find({}).
    populate("products").
    exec((err, foundOrders) => {
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

// SHOW ROUTE
router.get("/:id", (req, res) => {
    Order.findById(req.params.id, (err, foundOrder) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            res.json(foundOrder);
        }
    });
});

// UPDATE ROUTE
router.put("/:id", (req, res) => {
    Order.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        products: req.body.products,
        totalCost: req.body.totalCost,
    }, (err, updatedOrder) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            console.log(updatedOrder);
            res.json("Order Updated");
        }
    });
});

// DELETE ROUTE
router.delete("/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id, (err, deletedOrder) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            console.log(deletedOrder);
            res.json("Order Deleted!");
        }
    });
});

module.exports = router;