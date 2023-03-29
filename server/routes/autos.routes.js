const express = require("express");
const router = express.Router({ mergeParams: true });
// const mysql = require("mysql2");
const chalk = require("chalk");
// const Sequelize = require("sequelize");
const modelAuto = require("../models/auto");

const ModelAuto = modelAuto();

router.get("/auto", async (req, res) => {
  try {
    await ModelAuto.Avtos.findAll({ raw: true })
      .then((avto) => {
        res.status(200).send(avto);
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
        res.status(200).send(gn);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.post("/auto", async (req, res) => {
  try {
    const gn = await ModelAuto.Gn.create({
      type: req.body.data.typeAuto.value,
      marka: req.body.data.brandAuto,
      nomer: req.body.data.gnAuto,
      archive: "",
      comment: req.body.data.comment,
    });
    // console.log("gn--------------", gn);
    // console.log("gn's auto-generated ID:", gn.id);
    // console.log(req.body);
    // console.log(req.body.data.typeAuto.value);
    res.status(200).send({ gn });
    //res.data(gn);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.post("/typeauto", async (req, res) => {
  try {
    // console.log("target", req.body.value);
    const type = await ModelAuto.Avtos.create({
      name: req.body.value,
      comment: "",
    });
    // console.log("gn--------------", gn);
    // console.log("gn's auto-generated ID:", gn.id);
    // console.log(req.body);
    // console.log(req.body.data.typeAuto.value);
    res.status(200).send({ type });
    //res.data(gn);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

router.patch("/delete", async (req, res) => {
  try {
    const gn = ModelAuto.Gn.update(
      {
        archive: "1",
      },
      { where: { id: req.body.id } }
    );

    // console.log("gn's auto-generated ID:", gn.id);
    // console.log("id:-------------------------------- ");
    // console.log("id: ", req.body);
    // console.log(req.body.data.typeAuto.value);
    res.status(200);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});
router.patch("/auto/", async (req, res) => {
  try {
    const gn = await ModelAuto.Gn.update(
      {
        type: req.body.data.typeAuto.value,
        marka: req.body.data.brandAuto,
        nomer: req.body.data.gnAuto,
        archive: "",
        comment: req.body.data.comment,
      },
      { where: { id: req.body.data.id } }
    ).then((result) => console.log("updated"));
    // console.log("gn's auto-generated ID:", gn.id);

    // console.log("------------------------------");
    // console.log(req.body);
    // console.log("------------------------------");
    // console.log(req.body.data.typeAuto.value);
    res.status(200).send({ gn });
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
});

module.exports = router;
