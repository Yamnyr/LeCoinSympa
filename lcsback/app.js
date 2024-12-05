const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8080;

// AJOUTER LES DEUX LIGNES ICI
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/lecoinsympa", {})
    .then(() => {
        console.log("Connected to the mongoDB database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


const categoryRoute = require('./routes/categoryRoute');
const advertisementRoute = require('./routes/advertisementRoute');
const userRoute = require('./routes/userRoute');
// app.use("/", routes);
app.use('/category', categoryRoute);
app.use('/advertisement', advertisementRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
