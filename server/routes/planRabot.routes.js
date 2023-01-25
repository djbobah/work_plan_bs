const express = require("express");
const router = express.Router({ mergeParams: true });
const { Op } = require("sequelize");
const chalk = require("chalk");
// const mysql = require("mysql2");
// const chalk = require("chalk");
// const Sequelize = require("sequelize");
const modelPlanRabot = require("../models/planRabot");

const ModelPlanRabot = modelPlanRabot();

router.get("/object", async (req, res) => {
  try {
    await ModelPlanRabot.Object.findAll({
      raw: true,
    })
      .then((object) => {
        res.status(200).send(object);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.get("/vid", async (req, res) => {
  try {
    await ModelPlanRabot.VidRabot.findAll({
      where: {
        id_sl: { [Op.eq]: req.query.id_sl },
      },
      raw: true,
    })
      .then((vid) => {
        res.status(200).send(vid);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.get("/podr", async (req, res) => {
  try {
    await ModelPlanRabot.PodrOrg.findAll({ raw: true })
      .then((podr) => {
        res.status(200).send(podr);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.get("/plan", async (req, res) => {
  try {
    // console.log(req.query.id_sl);
    // console.log(chalk.blue("--------------------"));
    // console.log(chalk.blue(req.query.dateEnd));
    await ModelPlanRabot.Plan.findAll({
      where: {
        data_rabot: {
          [Op.gte]: req.query.dateFrom,
          [Op.lte]: req.query.dateEnd,
        },
        id_sl: { [Op.eq]: req.query.id_sl },
      },
      raw: true,
    })
      .then((plan) => {
        // console.log(chalk.red(plan));
        res.status(200).send(plan);
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
    const work = await ModelPlanRabot.VidRabot.create({
      name: req.body.value,
      comment: "",
      id_sl: req.body.id_sl,
    });
    // const gn = await ModelAuto.Gn.create({
    //   type: req.body.data.typeAuto.value,
    //   marka: req.body.data.brandAuto,
    //   nomer: req.body.data.gnAuto,
    //   archive: "",
    //   comment: req.body.data.comment,
    // });
    console.log(chalk.green("WORK--------------", req.body.value));
    console.log(chalk.green("WORK--------------", req.body.id_sl));
    // console.log("gn's auto-generated ID:", gn.id);
    // console.log(req.body);
    // console.log(req.body.data.typeAuto.value);
    res.status(200).send(work);
    //res.data(gn);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

module.exports = router;