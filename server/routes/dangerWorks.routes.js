const express = require("express");
const router = express.Router({ mergeParams: true });
// const mysql = require("mysql2");
// const chalk = require("chalk");
// const Sequelize = require("sequelize");
const modelDangerWork = require("../models/dangerWork");
const ModelDangerWork = modelDangerWork();

router.get("/work", async (req, res) => {
  try {
    await ModelDangerWork.DangerWorks.findAll({ raw: true })
      .then((work) => {
        res.status(200).send(work);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
module.exports = router;
