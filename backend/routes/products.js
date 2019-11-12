const router = require("express").Router();
const Product = require("../models/product.js");

// INDEX ROUTE // Dynamic Index Route with search functionality
router.get("/search", (req, res) => {

    let keyword = req.query.keyword;

    Product.
    find({
        $or: [
            {"title": new RegExp(keyword, 'i')},
            {"description": new RegExp(keyword, 'i')}
        ]
    }, (err, foundProducts) => {
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

// SHOW ROUTE
router.get("/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            res.json(foundProduct);
        }
    });
});

// UPDATE ROUTE
router.put("/:id", (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    }, (err, updatedProduct) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            console.log(updatedProduct);
            res.json("Product Updated");
        }
    });
});

// DELETE ROUTE
router.delete("/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            console.log(deletedProduct);
            res.json("Product Deleted!");
        }
    });
});

module.exports = router;