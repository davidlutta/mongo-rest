const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/VerifyToken");
router.use(express.json({type: "application/javascript"}));
const Post = require("../../models/Post");
const User = require("../../models/User");
const limit = 10;

function getName(apiKey) {
    User.findById(apiKey, (err, user) => {
        if (err) {
            console.log(err.message);
            return;
        }
        if (!user) {
            console.log("No user found");
            return;
        }
        console.log(user.name);
    });
}

router.get('/', verifyToken, (req, res) => {
    // Page
    let page = parseInt(req.query.page) || 1;
    const options = {
        page,
        limit,
        collation: {locale: 'en'}
    };
    Post.paginate({}, options, (err, posts) => {
        if (err) {
            res.status(204).send({
                status: "error",
                message: err.message
            });
        }
        res.status(200).send({
            status: "success",
            posts
        });
    });
});

router.post('/', verifyToken, (req, res) => {
    if (req.body.title && req.body.body) {
        Post.create({
            title: req.body.title.toString(),
            body: req.body.body.toString(),
            timestamp: Date.now()
        }, (err) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Failed to save post"
                });
            }
            res.status(200).send({
                status: "success",
                message: "Saved Post 😊"
            });
        });
    } else {
        res.status(422).send({
            status: "error",
            message: `Request cannot be processed 😢 Title or body missing`
        });
    }
});
module.exports = router;
