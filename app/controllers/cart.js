var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Product = require('../models/product');
var middlewareObj = require('../../middlewares/loginCheck');


router.get('/cart', middlewareObj.isLoggedIn, function(req, res) {
    res.render('cart');
});



//Add to cart 
router.get('/addToCart/:id', middlewareObj.isLoggedIn, function(req, res) {
    var query = User.findOne({ "username": req.user.username });


    Product.findById(req.params.id, function(err, foundProduct) {
        if (err) {
            console.log(err.message);

            req.flash('error', 'Something is wrong,Product not added to cart');
            res.redirect('/products');

        } else {

            query.exec(function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    user.cart.items.push(foundProduct);
                    user.cart.totalQuantity++;
                    user.cart.totalPrice += foundProduct.price;
                    user.save();
                    //console.log(user);
                }
            });


            req.flash('success', 'Item Added to cart');
            res.redirect('/products');
            //console.log(user.cart);


        }



    });

});




//Remove from cart 
router.get('/removeFromCart/:id', middlewareObj.isLoggedIn, function(req, res) {
    var query = User.findOne({ "username": req.user.username });


    Product.findById(req.params.id, function(err, foundProduct) {
        if (err) {
            console.log(err.message);
            // console.log(req.session.cart);
            req.flash('error', 'Something is wrong,Product not removed cart');
            res.redirect('/products');

        } else {

            query.exec(function(err, user) {
                if (err) {
                    console.log(err);
                } else {

                    var indexOfProduct = user.cart.items.findIndex(function(product) {
                        var productID = product._id.toString();
                        console.log(product);
                        return productID === req.params.id;
                    });

                    if (indexOfProduct > -1) {
                        foundProduct = user.cart.items[indexOfProduct];
                        user.cart.items.splice(indexOfProduct, 1);
                        user.cart.totalQuantity--;
                        user.cart.totalPrice -= foundProduct.price;
                        user.save();
                        //  console.log(user);
                    }
                }
            });


            req.flash('success', 'Item removed from cart');
            res.redirect('/cart');
            //console.log(user.cart);


        }



    });

});



module.exports = router;