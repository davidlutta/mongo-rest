const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const verifyToken = require('./VerifyToken');


let User = require('../../models/User');

router.post('/register', (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }, (err, user) => {
        if (err) {
            return res.sendStatus(500).json({
                status: "error",
                message: "There was a problem registering user"
            });
        }

        // creating token
        let token = jwt.sign({id: user._id}, process.env.CONFIG_SECRET, {
            expiresIn: 86400  // 24 hours
        });

        res.status(200).send({status: "success", auth: true, token});
    });
});

router.get('/me', verifyToken, (req, res) => {
    // let token = req.headers['x-access-token'];
    /*let token = req.headers['api-key'];
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: "No token provided"
        });
    }*/
    /*jwt.verify(token, process.env.CONFIG_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: "Failed to authenticate"
            });
        }
    });*/

    // making sure id actually belongs to the owner
    User.findById(req.userId, (err, user) => {
        if (err) {
            return res.status(500).send({
                status: "error",
                message: "Problem finding User"
            });
        }
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "User not found"
            });
        }
        res.status(200).send({status: "success", user});
    });
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            return res.status(500).send({status: "success", message: err.message});
        }
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "User not found"
            });
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                status: "error",
                auth: false,
                token: null
            });
        }

        let token = jwt.sign({id: user._id}, process.env.CONFIG_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({
            status: "success",
            auth: true,
            token
        });
    });
});

module.exports = router;
