"use strict";
const express = require("express");
require("dotenv").config();
const cors = require("cors");
let dbConnect = require("./dbConnect");
const app = express();
let userRoutes = require("./routes/userRoutes");
let authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MySQL application." });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
