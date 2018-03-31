var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
    items: [],
    totalQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },

});


module.exports = mongoose.model('Cart', CartSchema);