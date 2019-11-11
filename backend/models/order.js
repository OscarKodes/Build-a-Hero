const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    totalCost: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);