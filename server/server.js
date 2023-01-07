const express = require("express");
const os = require("os");
const chalk = require("chalk");
const config = require("config");
const mysql = require("mysql2/promise");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

const PORT = config.get("port") ?? 3000;

if (process.env.NODE_ENV === "production") {
  console.log(chalk.red("Production"));
} else {
  console.log(chalk.red("Development"));
}
// const basePath=path.join
console.log("Platform: ", os.platform());
console.log("User: ", os.userInfo().username);
console.log("ARM: ", os.hostname());

//console.log(works);

// // получение данных
// app.get("/", (req, res) => {
//   //здесь нужно прописать действия сервера при пути /
//   res.end(os.hostname());
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
let vid_rabot = null;
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
    const conn = await mysql.createConnection(config.get("connectPlanRabot"));

    // const [rows, fields] = await conn.execute("SELECT * FROM vid_rabot");
    // await conn.end();
    // было внутри connect
    // function (err) {  if (err) {
    //           return console.error("Ошибка: " + err.message);
    //         } else {
    //           console.log(
    //             chalk.blue("Подключение к серверу MySQL успешно установлено")
    //           );
    //         }}
    // console.log("rows", rows);

    app.listen(PORT, () => {
      console.log(chalk.blue(`server is running on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1); //1 значит что произошла какая то ошибка
  }
}

start();
