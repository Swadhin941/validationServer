const { bcrypt, saltRounds, jwt } = require("../Config/config");
const { Users } = require("../model/modelDb");

exports.login = async (req, res) => {
    
        const result = await Users.findOne({ email: req.body.email });
        console.log(req.body);
        bcrypt.compare(req.body.password, result.password, (error, result2) => {
            if (result2 === true) {
                const accessToken = jwt.sign(
                    { email: req.body.email },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: "1h" }
                );
                res.cookie("accessToken", accessToken, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                });
                const rt = jwt.sign(
                    { email: req.body.email },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: "1d" }
                );
                res.cookie("rt", rt, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                });
                res.status(201).send({ message: result.password });
            } else {
                return res.status(401).send({ message: "Wrong password" });
            }
        });
    
};

exports.register = async (req, res) => {
    console.log(req.body);
    try {
        bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
            const result = await Users.insertOne({
                email: req.body.email,
                password: hash,
                Name: req.body.fullName,
            });
            return res.status(201).send({ ...req.body, password: hash });
        });
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

exports.setJWT = async (req, res) => {
    console.log("jwt");
    
    // res.cookie("accessToken", token, {
    //     maxAge: 60 * 60 * 1000,
    // });
    
    // res.status(201).send({ token: token });
};
