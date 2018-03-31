var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String, required: true, unique: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    cart: { items: [], totalQuantity: { type: Number, default: 0 }, totalPrice: { type: Number, default: 0 } }
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);