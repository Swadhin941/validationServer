const express = require("express");
const { login, register, setJWT } = require("../controller/auth");
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/jwt", setJWT);
userRouter.post("/SubscriberCheck",)

module.exports={userRouter};