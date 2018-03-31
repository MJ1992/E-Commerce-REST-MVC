var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Product = require('../models/product');
//var Cart = require('../models/cart');

//show all products
router.get('/', isLoggedIn, function(req, res) {
    Product.find({}, function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.user);
            res.render('products', { products: products });
        }
    });


});

router.get('/cart', isLoggedIn, function(req, res) {
    res.render('cart');
});


//to create a new product
router.get('/new', isLoggedIn, function(req, res) {
    res.render('newProduct');
});

router.post('/', function(req, res) {
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
router.get('/:id', isLoggedIn, function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct) {
        if (err) {
            console.log(err);
        } else {
            res.render('showProduct', { product: foundProduct });
        }
    });


});

//to show edit  form for a particular product
router.get('/:id/edit', isLoggedIn, function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct) {
        if (err) {
            console.log(err);
        } else {
            res.render('editProduct', { product: foundProduct });
        }
    });

});

router.put('/:id', function(req, res) {
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
router.delete('/:id', isLoggedIn, function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err, foundProduct) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/products');
        }
    });

});




//Add to cart 
router.get('/addToCart/:id', isLoggedIn, function(req, res) {
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
                    console.log(user);
                }
            });


            req.flash('success', 'Item Added to cart');
            res.redirect('/products');
            //console.log(user.cart);


        }



    });

});




//Remove from cart 
router.get('/removeFromCart/:id', isLoggedIn, function(req, res) {
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
                        return productID === req.params.id;
                    });
                    console.log(indexOfProduct);
                    if (indexOfProduct > -1) {

                        user.cart.items.splice(indexOfProduct, 1);
                        user.cart.totalQuantity--;
                        user.cart.totalPrice -= foundProduct.price;
                        user.save();
                        console.log(user);
                    }
                }
            });


            req.flash('success', 'Item removed from cart');
            res.redirect('/products');
            //console.log(user.cart);


        }



    });

});




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    } else {
        req.flash('error', 'You need to login first!');
        res.redirect('/login');
    }

}


module.exports = router;