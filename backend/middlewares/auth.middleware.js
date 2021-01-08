
const jwt = require('jsonwebtoken');
const consts = require('../consts/consts');

const authMiddleware =async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken =await jwt.verify(token, consts.SECRET_KEY);

        req.user = decodedToken.user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({ message: "please authenticate!" })
    }
}

module.exports = authMiddleware;

