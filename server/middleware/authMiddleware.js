const jwt = require('jsonwebtoken')


module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.header.authorization.split(' ')[1]
        if(!token) {
            return res.status(401).json({message: "Не авторизований"})
        }

        const decoded = jwt.verify(token,) // secret.env
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message: "Не авторизований"})
    }
}