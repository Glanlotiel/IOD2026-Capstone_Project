const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Models = require("../models");

const authRegister = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const user = await Models.User.create({
      email,
      firstName,
      lastName,
      password,
    });
    res.status(201).json({ message: "User Created", id: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Models.User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Incorrect Email or Password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const authUpdate = async (req, res) => {
  try {
    await Models.User.update(req.body, {
      where: { id: req.user.id },
    });
    const updated = await Models.User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({ user: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const authDelete = async (req, res) => {
  try {
    await Models.User.destroy({ where: { id: req.user.id } });
    res.status(200).json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const authMe = async (req, res) => {
  try {
    const user = await Models.User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ error: "User Not Found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  authRegister,
  authLogin,
  authUpdate,
  authDelete,
  authMe,
};
