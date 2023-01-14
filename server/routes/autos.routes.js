const express = require("express");
const router = express.Router({ mergeParams: true });
// const mysql = require("mysql2");
// const chalk = require("chalk");
// const Sequelize = require("sequelize");
const modelAuto = require("../models/auto");

const ModelAuto = modelAuto();

router.get("/auto", async (req, res) => {
  try {
    await ModelAuto.Avtos.findAll({ raw: true })
      .then((avto) => {
        res.json(avto);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.get("/gn", async (req, res) => {
  try {
    await ModelAuto.Gn.findAll({ raw: true })
      .then((gn) => {
        res.json(gn);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

module.exports = router;
