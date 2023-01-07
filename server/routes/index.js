const express = require("express");

const router = express.Router({ mergeParams: true });

// получение данных
router.get("/", async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибкаю Попробуйте позже..." });
  }
  //здесь нужно прописать действия сервера при пути /
  // res.end(os.hostname());
});

// отправка данных
router.post("/", (req, res) => {
  //здесь нужно прописать действия получения данных с клиента при пути /
  console.log(req.body);
});

module.exports = router;
