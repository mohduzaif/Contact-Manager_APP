
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = expressAsyncHandler( async(req, res, next) => {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decodedUser) => {
            if(err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decodedUser.user;
            next();
        });
        if(!token) {
            res.status(401);
            throw new Error("User not authorized or token is missing");
        }; 
    };
} );

module.exports = validateToken;