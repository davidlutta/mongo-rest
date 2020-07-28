const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    let token = req.headers['api-key'];
    if (!token) {
        return res.status(403).send({
            auth:false,
            message: "No Authentication Token provided 😠"
        })
    }

    jwt.verify(token, process.env.CONFIG_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                message: "Failed To Authenticate Token 😢"
            })
        }

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
