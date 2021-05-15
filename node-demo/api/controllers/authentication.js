const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');


module.exports.register = (req, res) => {
    console.log("req ==>", req.body)
    const user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.userName = req.body.userName;
    user.phoneNumber = req.body.phoneNumber;
    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    console.log("user 11==>", user)

    user.save((err, data) => {
        if (err) {
            res.status(400);
            res.json({
                status: false,
                message: err
            });
        }
        const token = user.generateJwt();
        res.status(200);
        res.json({
            token: token,
            status: true,
            message: "Registration success !!"
        });
    });
};

module.exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
        // If a user is found
        if (user) {
            const token = user.generateJwt();
            res.status(200);
            res.json({
                accessToken: token,
                user: user
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};