const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');

/**
 * AddCart
 * @param {*} req
 * @param {*} res
 */
module.exports.AddCart = (req, res) => {
    Cart.find({ productId: req.body.productId }).exec(function (err, product) {
        if (err) {
            res.status(400);
            res.json({
                status: false,
                message: err
            });
        } else {
            console.log("product ==>", product)
            if (product.length > 0) {

                let qty = parseInt(product[0].quantity) + parseInt(req.body.quantity);
                let totalPrice = parseInt(qty) * parseInt(req.body.unitPrice);
                let setupdateData = {
                    quantity: qty,
                    totalPrice: totalPrice
                }
                console.log("setupdateData ==>", setupdateData);

                Cart.findOneAndUpdate({ _id: product[0]._id }, setupdateData, {
                    new: true,
                    upsert: true // Make this update into an upsert
                }, (err, data) => {
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
                        message: "Add Cart Successfully !!"
                    });
                })

            } else {
                const cart = new Cart();
                cart.productId = req.body.productId;
                cart.productName = req.body.productName;
                cart.description = req.body.description;
                cart.quantity = req.body.quantity;
                cart.unitPrice = req.body.unitPrice;
                cart.totalPrice = req.body.quantity * req.body.unitPrice;
                cart.productImage = req.body.productImage;

                cart.save((err, data) => {
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
                        message: "Add Cart Successfully !!"
                    });
                });
            }

        }
    })


}

/**
 * ListCart
 * @param {*} req
 * @param {*} res
 */
module.exports.ListCart = (req, res) => {
    Cart.find().exec(function (err, products) {
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
 * updateCart
 * @param {*} req
 * @param {*} res
 */
module.exports.updateCart = (req, res) => {
    let qty = parseInt(req.body.quantity);
    let totalPrice = parseInt(qty) * parseInt(req.body.unitPrice);
    let setupdateData = {
        quantity: qty,
        totalPrice: totalPrice
    }

    Cart.findOneAndUpdate({ _id: req.body._id }, setupdateData, {
        new: true,
        upsert: true // Make this update into an upsert
    }, (err, data) => {
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
            message: "Update Cart Successfully !!"
        });
    })
}
