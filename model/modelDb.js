const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
    `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.wxzkvmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const Users= client.db("security").collection("users");


module.exports= {client, Users}
