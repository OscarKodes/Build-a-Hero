const router = require("express").Router();
const Product = require("../models/product.js");

// INDEX ROUTE 
router.get("/", (req, res) => {
    Product.find({}, (err, foundProducts) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            res.json(foundProducts);
        }
    });
});

// CREATE ROUTE
router.post("/", (req, res) => {

    Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }, (err, newProduct) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            console.log(newProduct);
            res.json("New product created!");
        }
    });
});

module.exports = router;