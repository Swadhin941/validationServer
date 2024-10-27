const { jwt } = require("../Config/config");

exports.verifyJWT = (req, res, next) => {
    console.log(req.cookies.rt);
    // const authHeader = req.cookies.accessToken;
    // if (!authHeader) {
    //     return res.status(401).send({ message: "Unauthorize access!" });
    // }
    // const token = authHeader.split(" ")[1];
    // jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    //     if (err) {
    //         console.log(req.cookie.ACCESS_TOKEN)
    //         return res.status(403).send({ message: "Invalid token!" });
    //     }
    //     req.decoded= decoded;
    //     console.log(decoded);
    //     next();
    // });
};
