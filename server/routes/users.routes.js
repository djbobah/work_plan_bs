const express = require("express");
const router = express.Router({ mergeParams: true });
const { Op } = require("sequelize");
const chalk = require("chalk");
// const mysql = require("mysql2");
// const chalk = require("chalk");
// const Sequelize = require("sequelize");
const modelUsers = require("../models/users");

const ModelUsers = modelUsers();

router.get("/user", async (req, res) => {
  console.log(chalk.red(req.query.id_sl));
  try {
    await ModelUsers.User.findAll({
      where: {
        id_sl: { [Op.eq]: `${req.query.id_sl}` },
        noplan: 0,
      },
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["FIO", "ASC"],
      ],
      raw: true,
    })
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
router.get("/department", async (req, res) => {
  // console.log(chalk.red(req.query.id_sl));
  try {
    await ModelUsers.Sluzhba.findAll({
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["Name", "ASC"],
      ],
      raw: true,
    })
      .then((department) => {
        res.status(200).send(department);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

module.exports = router;
