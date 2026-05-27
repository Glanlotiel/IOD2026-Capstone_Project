const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", (req, res) => {
  Controllers.authController.authRegister(req, res);
});

router.post("/login", (req, res) => {
  Controllers.authController.authLogin(req, res);
});

router.get("/me", verifyToken, (req, res) => {
  Controllers.authController.authMe(req, res);
});

router.put("/update", verifyToken, (req, res) => {
  Controllers.authController.authUpdate(req, res);
});

router.delete("/delete", verifyToken, (req, res) => {
  Controllers.authController.authDelete(req, res);
});

module.exports = router;
