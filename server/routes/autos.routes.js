const express = require("express");
const router = express.Router({ mergeParams: true });
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "transport",
  password: "Kamensk",
});

router.get("/avto", async (req, res) => {
  try {
    connection.connect(function (err) {
      if (err) {
        return console.error("Ошибка: " + err.message);
      } else {
        console.log(
          chalk.blue("Подключение к серверу MySQL успешно установлено")
        );
      }
    });
    let vid_rabot = null;
    connection.query(
      "SELECT * FROM vid_rabot",
      function (err, results, fields) {
        // console.log(err);
        let vid_rabot = results;
        // console.log(vid_rabot); // собственно данные
        // console.log(vid_rabot.length); // мета-данные полей
        res.json(vid_rabot);
      }
    );
    connection.end();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
// connection.connect(function (err) {
//   if (err) {
//     return console.error("Ошибка: " + err.message);
//   } else {
//     console.log(chalk.blue("Подключение к серверу MySQL успешно установлено"));
//   }
// });
// let vid_rabot = null;
// connection.query("SELECT * FROM vid_rabot", function (err, results, fields) {
//   // console.log(err);
//   // let vid_rabot = results;
//   // console.log(vid_rabot); // собственно данные
//   // console.log(vid_rabot.length); // мета-данные полей
// });
// connection.end();
