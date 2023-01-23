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
    await ModelPlanRabot.Object.findAll({ raw: true })
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
    await ModelPlanRabot.VidRabot.findAll({ raw: true })
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
  // const paramIdSl = () => {
  //   if (req.query.id_s !== "") {
  //     return ( id_sl: { [Op.eq]: req.query.id_sl } );
  //   }
  // };

  try {
    console.log(req.query.id_sl);
    await ModelPlanRabot.Plan.findAll({
      where: {
        data_rabot: { [Op.gte]: "2022-12-25" },
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

module.exports = router;
