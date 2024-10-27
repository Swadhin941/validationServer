require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4999;
const cors = require("cors");
const morgan = require("morgan");
const { userRouter } = require("./routers/user.auth");
const cookieParser = require("cookie-parser");
const { verifyJWT } = require("./middleware/verifyJWT");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true, //access-control-allow-credentials:true
    })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", userRouter);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send({ message: "Hello, world!" });
});

app.get("/testPost", verifyJWT, (req, res) => {
    console.log(req.body);
});

//Page not found
app.use((req, res, next) => {
    res.status(404).send({ message: "Page not found!" });
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
