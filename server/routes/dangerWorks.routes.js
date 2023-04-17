const express = require("express");
const router = express.Router({ mergeParams: true });
// const mysql = require("mysql2");
const chalk = require("chalk");
// const Sequelize = require("sequelize");
const modelDangerWork = require("../models/dangerWork");
const modelPlanRabot = require("../models/planRabot");
const ModelDangerWork = modelDangerWork();
const ModelPlanRabot = modelPlanRabot();

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
router.post("/work", async (req, res) => {
  try {
    // console.log(chalk.blue(req.body.id));
    // console.log(chalk.blue(req.body.user));
    // console.log(chalk.blue(req.body.remote_addr));
    // console.log(chalk.blue(typeof Date(req.body.date_utv)));
    // console.log(chalk.blue(req.body.time_utv));

    const dangerWork = await ModelDangerWork.DangerWorks.create({
      id_rab: req.body.id,
      user: req.body.user,
      remote_addr: req.body.remote_addr,
      date_utv: req.body.date_utv,
      time_utv: req.body.time_utv,
      comment: "",
    });
    const workPlan = await ModelPlanRabot.Plan.update(
      {
        utv_opasn: "1",
      },
      { where: { id: req.body.id } }
    );

    res.status(200).send(workPlan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

module.exports = router;
