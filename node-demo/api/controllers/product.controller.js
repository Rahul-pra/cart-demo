const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const constConfig = require('../config/constConfig');

/**
 * AddProduct
 * @param {*} req 
 * @param {*} res 
 */
module.exports.AddProduct = (req, res) => {
    const product = new Product();

    product.productName = req.body.productName;
    product.description = req.body.description;
    product.quantity = req.body.quantity;
    product.unitPrice = req.body.unitPrice;
    product.productImage = constConfig.IMAGE_ENDPOINT + req.file.filename;

    product.save((err, data) => {
        console.log("data", data);
        if (err) {
            res.status(400);
            res.json({
                status: false,
                message: err
            });
        }
        res.status(200);
        res.json({
            status: true,
            message: "Add Product Successfully !!"
        });
    });

}

/**
 * ListProduct
 * @param {*} req
 * @param {*} res
 */
module.exports.ListProduct = (req, res) => {
    Product.find().exec(function (err, products) {
        if (err) {
            res.status(400);
            res.json({
                status: false,
                message: err
            });
        }
        res.status(200);
        res.json({
            status: true,
            message: "Successfully !!",
            data: products
        });
    });
}


/**
 * updateProduct
 * @param {*} req
 * @param {*} res
 */
module.exports.updateProduct = (req, res) => {

}
