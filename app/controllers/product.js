var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Product = require('../models/product');
var middlewareObj = require('../../middlewares/loginCheck');


//show all products
router.get('/', middlewareObj.isLoggedIn, function(req, res) {
    Product.find({}, function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.user);
            res.render('products', { products: products });
        }
    });


});

router.get('/cart', middlewareObj.isLoggedIn, function(req, res) {
    res.render('cart');
});


//to create a new product
router.get('/new', middlewareObj.isLoggedIn, function(req, res) {
    res.render('newProduct');
});

router.post('/', middlewareObj.isLoggedIn, function(req, res) {
    Product.create(req.body.product, function(err, product) {
        if (err) {
            console.log(err);
            res.render('newProduct');
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
            console.log(err);
        } else {
            res.render('showProduct', { product: foundProduct });
        }
    });


});

//to show edit  form for a particular product
router.get('/:id/edit', middlewareObj.isLoggedIn, function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct) {
        if (err) {
            console.log(err);
        } else {
            res.render('editProduct', { product: foundProduct });
        }
    });

});

router.put('/:id', middlewareObj.isLoggedIn, function(req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProd) {
        if (err) {
            console.log(err);
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
            console.log(err);
        } else {
            res.redirect('/products');
        }
    });

});








module.exports = router;