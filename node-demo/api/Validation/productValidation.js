const Joi = require('joi');
/**
 * login validation
 */
const addProductValidatio = {
    body: Joi.object({
        productName: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        quantity: Joi.number()
            .required(),
        unitPrice: Joi.number()
            .required(),

    }),
}

/**
 * signup validation
 */
const signupValidation = {
    body: Joi.object({
        firstName: Joi.string()
            .required(),
        lastName: Joi.string()
            .required(),
        userName: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        phoneNumber: Joi.number()
            .required(),
        name: Joi.string()
            .required(),
    }),
}


module.exports = {
    addProductValidatio,
    signupValidation,
};