const jwt = require('jsonwebtoken');

const secret = "3f9e6b12fedacbd173ab6b875dca0c884b3e9f7bb291593d88af3d93f4e3898e";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;