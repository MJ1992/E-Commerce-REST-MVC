var mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    price: { type: Number, required: true }

});


module.exports = mongoose.model('Product', productSchema);