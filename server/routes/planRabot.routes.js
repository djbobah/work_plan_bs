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

    console.log(chalk.green("WORK--------------", req.body.value));
    console.log(chalk.green("WORK--------------", req.body.id_sl));
    res.status(200).send(work);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.post("/object", async (req, res) => {
  try {
    const object = await ModelPlanRabot.Object.create({
      name: req.body.value,
      comment: req.body.id_sl,
      // id_sl: req.body.id_sl,
    });

    console.log(chalk.green("OBJECT--------------", req.body.value));
    console.log(chalk.green("OBJECT--------------", req.body.id_sl));
    res.status(200).send(object);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.post("/contractingOrganization", async (req, res) => {
  try {
    const organization = await ModelPlanRabot.PodrOrg.create({
      name: req.body.value,
      comment: req.body.id_sl,
      // id_sl: req.body.id_sl,
    });

    console.log(chalk.green("ORG--------------", req.body.value));
    console.log(chalk.green("ORG--------------", req.body.id_sl));
    res.status(200).send(organization);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

router.post("/plan", async (req, res) => {
  try {
    const podrOrg =
      typeof req.body.data.contractingOrganization != "object"
        ? "0"
        : req.body.data.contractingOrganization.value;
    const auto = req.body.data.auto === null ? 1 : req.body.data.auto.value;
    const newBrigadaArr = req.body.data.brigada.map((el) => {
      return el.value;
    });
    const newBrigadaStr = newBrigadaArr.join(";");

    // console.log(chalk.green("contractingOrganization--------------", podrOrg));

    const workPlan = await ModelPlanRabot.Plan.create({
      id_sl: req.body.id_sl,
      id_object: req.body.data.objectForWork.value,
      id_vid_rabot: req.body.data.typeOfWork.value,
      id_podr_org: podrOrg,
      sposob: req.body.data.methodOfWork.name,
      Brigada: newBrigadaStr,
      st_brigadi: req.body.data.brigadier.value,
      avto: auto,
      vipolneno: 0,
      Prichina_nevipol: "",
      data_rabot: req.body.data.dateOfWork,
      comment: req.body.data.comment,
      id_gn: 0,
      OPASN: 0,
      // req.body.data.isDanger
      utv_avto: 0,
      utv_opasn: 0,
    });
    console.log(chalk.red("-----------------------------------"));
    console.log(chalk.green("id_sl--------------", req.body.id_sl));
    console.log(
      chalk.green("id_object--------------", req.body.data.objectForWork.value)
    );
    console.log(
      chalk.green("id_vid_rabot--------------", req.body.data.typeOfWork.value)
    );
    console.log(chalk.green("id_podr_org--------------", podrOrg));
    console.log(
      chalk.green("sposob--------------", req.body.data.methodOfWork.name)
    );
    console.log(chalk.green("Brigada--------------", newBrigadaStr));
    console.log(
      chalk.green("st_brigadi--------------", req.body.data.brigadier.value)
    );
    console.log(chalk.green("avto--------------", auto));
    console.log(chalk.green("vipolneno--------------", 0));
    console.log(chalk.green("Prichina_nevipol--------------", ""));
    console.log(
      chalk.green("data_rabot--------------", req.body.data.dateOfWork)
    );
    console.log(chalk.green("comment--------------", req.body.data.comment));
    console.log(chalk.green("id_gn--------------", 0));
    console.log(chalk.green("OPASN--------------", 0));
    console.log(chalk.green("utv_avto--------------", 0));
    console.log(chalk.green("utv_opasn--------------", 0));

    console.log(chalk.red("-----------------------------------"));
    // console.log(chalk.green("ORG--------------", req.body.id_sl));
    res.status(200).send({ workPlan });
    //.send(organization)
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

module.exports = router;
