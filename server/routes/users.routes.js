const express = require("express");
const router = express.Router({ mergeParams: true });
// const mysql = require("mysql2");
// const chalk = require("chalk");
// const Sequelize = require("sequelize");
const modelUsers = require("../models/users");

const ModelUsers = modelUsers();

router.get("/user", async (req, res) => {
  try {
    await ModelUsers.User.findAll({ raw: true })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

module.exports = router;
