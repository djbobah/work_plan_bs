import express from "express";
import { works, auto, typeAuto } from "./fake_api/bd.js";
import mysql from "mysql2";

const app = express();

//console.log(works);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "plan_rabot",
  password: "Kamensk",
});
connection.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});
let vid_rabot = null;
connection.query("SELECT * FROM vid_rabot", function (err, results, fields) {
  // console.log(err);
  let vid_rabot = results;
  console.log(vid_rabot); // собственно данные
  console.log(vid_rabot.length); // мета-данные полей
});
connection.end();

// console.log(vid_rabot);

app.listen(5000, () => {
  console.log("server is running");
});
