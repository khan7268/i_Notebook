var jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-very-secure-secret';

const fetchuser = (req, res, next) => {
    // Get the user from jwt tocken and add id to req object
    const token = req.header('auth-token'); //get the tocken from the header
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }

}

module.exports = fetchuser;