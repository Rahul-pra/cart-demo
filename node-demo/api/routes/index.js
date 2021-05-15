const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const constConfig = require('../config/constConfig');
const userValidation = require('../Validation/userValidation')
const productValidation = require('../Validation/productValidation')
const app = require('express')()
const { validate, ValidationError } = require('express-validation');
var path = require('path');
const fs = require('fs');

const filesDir = 'uploads';

// check if directory exists
if (!fs.existsSync(filesDir)) {
    // if not create directory
    fs.mkdirSync(filesDir);

}
var multer = require('multer');
//var upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        var ext = !!file && !!file.originalname ? path.extname(file.originalname) : null;
        cb(null, Date.now() + ext)
    }
})

var upload = multer({ storage: storage })


app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err)
})

const auth = jwt({
    secret: constConfig.MY_SECRET,
    userProperty: 'payload',
    algorithms: ['RS256']
});

/**
 *  controllers
 */
const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlProduct = require('../controllers/product.controller');
const ctrlCart = require('../controllers/cart.controller');




/**
 *  API router
 */

// profile
router.get('/profile/', auth, ctrlProfile.profileRead);

// product validate(productValidation.addProductValidatio)
router.post('/add-product/', upload.single('productImage'), ctrlProduct.AddProduct);
router.get('/list-product/', ctrlProduct.ListProduct);
router.put('/update-product/:id', auth, ctrlProduct.updateProduct);

// cart
router.post('/add-cart/', ctrlCart.AddCart);
router.get('/list-cart/', ctrlCart.ListCart);
router.put('/update-cart/:id', ctrlCart.updateCart);

// authentication
router.post('/register', validate(userValidation.signupValidation), ctrlAuth.register);
router.post('/login', validate(userValidation.loginValidation), ctrlAuth.login);

module.exports = router;