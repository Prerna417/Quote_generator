const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const quoteRoute = require("./routes/quotes")

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(
        console.log("connection open")
    )
    .catch((err) =>
        console.log(err)
    );

 app.use("/api/auth", authRoute);
 app.use("/api/quote", quoteRoute);

app.listen("5000", () => {
    console.log("backend is running")
})
