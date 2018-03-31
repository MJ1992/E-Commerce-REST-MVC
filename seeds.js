var mongoose = require('mongoose');
var Product = require('./app/models/product');

var data = [{
        name: "Ralph Lauren Men's Solid Casual Blue Shirt",
        description: 'Polo Ralph Lauren T-shirt is 100% authentic and imported from USA. Size Type - US All New With Tag products are brand-new products directly sourced from the brand or authorized brand sources and come with the brand/import labels or tags.',
        image: 'https://rukminim1.flixcart.com/image/704/704/jfea93k0/shirt/r/w/x/m-345678-ralph-lauren-original-imaf3ubsmhuwz3xh.jpeg?q=70',
        price: 6980
    },
    {
        name: 'Diesel DZ7406 Leather Chronograph Watch',
        description: 'Diesel Mens Mr. Daddy 2.0 Black IP and Brown Leather Chronograph Watch',
        image: 'https://rukminim1.flixcart.com/image/704/704/jeokbrk0/watch/d/x/t/dz7406-diesel-original-imaf3bgegbzseaaz.jpeg?q=70',
        price: 23499
    },
    {
        name: "GAS Skinny Men's Blue Jeans",
        description: '',
        image: 'https://rukminim1.flixcart.com/image/832/832/jcgjo280/jean/y/m/m/32-91834wr50-gas-original-imaffh5b9dzqsh9h.jpeg?q=70',
        price: 6029
    },
    {
        name: 'Adidas Originals EQT CUSHION ADV Sneakers For Men  (Grey)',
        description: 'Casual Leather shoes for Men',
        image: 'https://rukminim1.flixcart.com/image/704/704/jc7z0y80/shoe/k/p/p/eqt-cushion-adv-ss18-10-adidas-originals-grefiv-ftwwht-crywht-original-imaffekrhrmdvh3m.jpeg?q=70',
        price: 13999
    },
    {
        name: 'BMW Wayfarer Sunglasses  (Grey)',
        description: 'Sunglasses for every occasion',
        image: 'https://rukminim1.flixcart.com/image/832/832/j95y4cw0/sunglass/e/g/k/free-size-b6522-90-bmw-original-imaezyzmjtddnzgg.jpeg?q=70',
        price: 16999
    },
    {
        name: 'GUCCI Men Beige, Black Genuine Leather, Canvas Belt',
        description: 'Selling your kidney for this is worth it',
        image: 'https://rukminim1.flixcart.com/image/704/704/jesunbk0/belt/e/e/f/36-inches-fashion-belt-36-inches-beige-and-black-fashion-belt-original-imaf3eqytcycgmce.jpeg?q=70',
        price: 45000
    },
    {
        name: 'Froskie Froskie Limited Edition Genuine Leather Designer Shoes',
        description: 'Accentuate Your Look Wearing These Coloured Dress Genuine Leather Shoes by Froskie. Experience Endless Comfort Adorning This Pair of Dress Shoes, which is Crafted Using Comfortable TPR (Thermoplastic Rubber) Sole',
        image: 'https://rukminim1.flixcart.com/image/704/704/jb2j98w0/shoe/h/e/k/35a17-bt02b-tan-coffee-10-froskie-tan-coffee-brown-original-imafygdmdkgj4rh2.jpeg?q=70',
        price: 14900
    },
    {
        name: 'Hidesign Men Brown Genuine Leather Wallet',
        description: 'Rugged yet fashionably smart! The gorgeous shine of the oversized brass buckle on the new distressed vegetable tanned leather will definitely make heads turn! Your best bet for a relaxed day about town.',
        image: 'https://rukminim1.flixcart.com/image/704/704/jcz4e4w0/wallet-card-wallet/y/t/r/vespucci-03-vespucci-03-wallet-hidesign-original-imaffzg8yqwzjmzt.jpeg?q=70',
        price: 8499
    },
    {
        name: "Bare Skin Full Sleeve Solid Men's Jacket",
        description: 'This amazing and trendy jacket will elevate your style quotient. We recommend you to wear it with a T-shirt, jeans or chino trousers and boots for a smart look.',
        image: 'https://rukminim1.flixcart.com/image/704/704/jacket/y/g/2/vngj-510-gi-01-bareskin-xxl-original-imaenzyzfqmcxd5x.jpeg?q=70',
        price: 12599
    }
];


//function to add data to db when server is restarted
function dbData() {
    Product.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        //add products
        data.forEach(function(product) {
            Product.create(product, function(err, product) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
}

module.exports = dbData;