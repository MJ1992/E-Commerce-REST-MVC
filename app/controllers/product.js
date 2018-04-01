var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Product = require('../models/product');
var middlewareObj = require('../../middlewares/loginCheck');
var responseGenerator = require('../../libs/responseGenerator');


module.exports.controller = function(app) {
    //show all products

    router.get('/', middlewareObj.isLoggedIn, function(req, res) {
        Product.find({}, function(err, products) {
            if (err) {

                res.send(responseGenerator.generate(true, "No products found", 404, null));
            } else {
                console.log(req.user);
                res.render('products', { products: products });
            }
        });


    });



    //to create a new product

    //show create product page
    router.get('/new', middlewareObj.isLoggedIn, function(req, res) {
        res.render('newProduct');
    });

    // submit create product page form
    router.post('/', middlewareObj.isLoggedIn, function(req, res) {
        Product.create(req.body.product, function(err, product) {
            if (err) {

                res.send(responseGenerator.generate(true, err.message, 422, null));
            } else {

                req.flash('success', 'Product added');
                res.redirect("/products");
            }
        });

    });

    // //show a particular product
    router.get('/:id', middlewareObj.isLoggedIn, function(req, res) {
        Product.findById(req.params.id, function(err, foundProduct) {
            if (err) {

                res.send(responseGenerator.generate(true, 'Product not found', 404, null));
            } else {
                res.render('showProduct', { product: foundProduct });
            }
        });


    });

    //to show edit  form for a particular product
    router.get('/:id/edit', middlewareObj.isLoggedIn, function(req, res) {
        Product.findById(req.params.id, function(err, foundProduct) {
            if (err) {

                res.send(responseGenerator.generate(true, 'Product not found in DB', 404, null));
            } else {
                res.render('editProduct', { product: foundProduct });
            }
        });

    });

    //submit edit from data
    router.put('/:id', middlewareObj.isLoggedIn, function(req, res) {
        Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProd) {
            if (err) {
                res.send(responseGenerator.generate(true, err.message, 422, null));
            } else {
                req.flash('success', 'Product updated');
                res.redirect('/products/' + req.params.id);
            }
        });

    });

    //to delete a particular product
    router.delete('/:id', middlewareObj.isLoggedIn, function(req, res) {
        Product.findByIdAndRemove(req.params.id, function(err, foundProduct) {
            if (err) {
                res.send(responseGenerator.generate(true, 'Product not found in DB', 404, null));
            } else {
                req.flash('success', 'Product removed successfully');
                res.redirect('/products');
            }
        });

    });


    app.use('/products', router);


};