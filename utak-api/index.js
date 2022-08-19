// Server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 4000;


mongoose.connect("mongodb+srv://admin:admin@cluster0.qnsrql7.mongodb.net/utak-test-app?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));

db.once("open", () => console.log("We're connected to the cloud database."));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/users", userRoutes);

app.listen(process.env.PORT || port, () => {
	console.log(`API is now online on port ${process.env.PORT || port}`);
})
