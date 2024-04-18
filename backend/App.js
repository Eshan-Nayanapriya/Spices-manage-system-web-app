const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
.catch((err)=> console.error("MongoDB Connection Error: ",err));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success !");
})

const UserRouter = require("./Routes/userRoutes");

//middleware
app.use("/users",UserRouter)


app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
})