const express = require("express");
const os = require("os");
const chalk = require("chalk");
const config = require("config");
const cors = require("cors");
const path = require("path");
// const mysql = require("mysql2/promise");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

const PORT = config.get("port") ?? 3000;

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
  console.log(chalk.red("Production"));
} else {
  console.log(chalk.red("Development"));
}
// const basePath=path.join
console.log("Platform: ", os.platform());
console.log("User: ", os.userInfo().username);
console.log("ARM: ", os.hostname());

console.log("PORT", PORT);

// app.get("/", (req, res) => {
//   res.send("************** hello");
// });

// app.set("trust proxy", true);

// Use req.ip or req.ips in the usual way

// // получение данных
// app.get("/", (req, res) => {
//   //здесь нужно прописать действия сервера при пути /
//   let ip = req.connection.remoteAddress.split(`:`).pop();
//   console.log(chalk.red("------- "));
//   console.log(chalk.red("------- ", ip));
//   console.log(chalk.red("------- "));
//   console.log(chalk.red("------- "));
//   console.log(chalk.red("------- ", req.ip));
//   console.log(chalk.red("------- "));
// });

// // отправка данных
// app.post("/", (req, res) => {
//   //здесь нужно прописать действия получения данных с клиента при пути /
//   console.log(req.body);
// });

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

// console.log(vid_rabot);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(chalk.blue(`server is running on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1); //1 значит что произошла какая то ошибка
  }
}

start();
