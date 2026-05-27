"use strict";

const User = require("./userData");

async function init() {
  await User.sync();
}

init();
module.exports = {
  User,
};
