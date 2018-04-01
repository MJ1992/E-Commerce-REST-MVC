var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Product = require('../models/product');
var middlewareObj = require('../../middlewares/loginCheck');
var responseGenerator = require('../../libs/responseGenerator');


module.exports.controller = function(app) {

    //go to cart
    router.get('/cart', middlewareObj.isLoggedIn, function(req, res) {
        res.render('cart');
    });



    //Add to cart 
    router.get('/addToCart/:id', middlewareObj.isLoggedIn, function(req, res) {
        //find the logged in user
        var query = User.findOne({ "username": req.user.username });

        //find the product in DB from id 
        Product.findOne({ '_id': req.params.id }, function(err, foundProduct) {

            if (err) {

                res.send(responseGenerator.generate(true, 'Product not found', 404, null));

            } else {
                //if product not found
                if (foundProduct == null) {
                    res.send(responseGenerator.generate(true, 'Product not found', 404, null));
                }
                //if product found
                else {
                    query.exec(function(err, user) {
                        if (err) {
                            res.send(responseGenerator.generate(true, 'User not found in DB', 404, null));
                        } else {
                            //push the product in items array in cart property in user model
                            user.cart.items.push(foundProduct);
                            user.cart.totalQuantity++;
                            user.cart.totalPrice += foundProduct.price;
                            user.save();

                        }
                    });


                    req.flash('success', 'Item Added to cart');
                    res.redirect('/products');

                }
            }

        });

    });




    //Remove from cart 
    router.get('/removeFromCart/:id', middlewareObj.isLoggedIn, function(req, res) {
        //found user data 

        User.findOne({ "username": req.user.username }, function(err, user) {
            if (err) {
                res.send(responseGenerator.generate(true, 'User not found in DB', 404, null));
            } else {
                //find the index of product in cart's items array using product id 
                var indexOfProduct = user.cart.items.findIndex(function(product) {
                    var productID = product._id.toString();
                    console.log(product);
                    return productID === req.params.id;
                });
                //if product found remove from items array
                if (indexOfProduct > -1) {
                    foundProduct = user.cart.items[indexOfProduct];
                    user.cart.items.splice(indexOfProduct, 1);
                    user.cart.totalQuantity--;
                    user.cart.totalPrice -= foundProduct.price;
                    user.save();
                    //  console.log(user);

                    req.flash('success', 'Item removed from cart');
                    res.redirect('/cart');
                } else {
                    res.send(responseGenerator.generate(true, 'Product not found in Cart', 404, null));
                }
            }
        });

    });


    app.use('/', router);

};