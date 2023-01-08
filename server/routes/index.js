const express = require("express");
// const Sequelize = require("sequelize");
// const modelAuto = require("../models/auto");

const router = express.Router({ mergeParams: true });
// const Avtos = modelAuto();

router.use("/auto", require("./autos.routes"));
// console.log(Avtos.Gn);
// получение данных
// router.get("/avto", async (req, res) => {
//   // console.log("modelAuto", Avtos);
//   // console.log("get");

//   try {
//     console.log("start try");
//     // Avtos.findAll({ raw: true })
//     //   .then((avto) => {
//     //     // console.log(avto);
//     //     res.json(avto);
//     //   })
//     //   .catch((err) => console.log(err));
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
//   }
//   //здесь нужно прописать действия сервера при пути /
//   // res.end(os.hostname());
// });

// // отправка данных
// router.post("/", (req, res) => {
//   //здесь нужно прописать действия получения данных с клиента при пути /
//   console.log(req.body);
// });

module.exports = router;
