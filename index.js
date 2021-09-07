const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

// Connecting to Database
connectToMongo();

const app = express();
const port = 5000;

// To use cors
app.use(cors());

// To use json bodies
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));

// Listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
