const express = require("express");

const app = express();

const works = [
  { id: "17", name: "Токарные работы", comment: "", id_sl: "16-а00129" },
  {
    id: "14",
    name: "  Осмотр колодцев и приямков ГПА КЦ",
    comment: "",
    id_sl: "16-а00129",
  },
  {
    id: "15",
    name: "  Пуск газоперекачивающего агрегата ГПА 16 м-03 Урал ст.№3 ",
    comment: "",
    id_sl: "16-а00129",
  },
  {
    id: "18",
    name: " восстановление ЛКП стен",
    comment: "",
    id_sl: "16-а00229",
  },
  {
    id: "21",
    name: " Востановление ЛКП АВОгаза",
    comment: "",
    id_sl: "16-а00129",
  },
  {
    id: "22",
    name: " Годовое техническое обслуживание ТО-6",
    comment: "",
    id_sl: "16-а00134",
  },
  {
    id: "26",
    name: "Замена и подключение ПИЭН",
    comment: "",
    id_sl: "16-а00133",
  },
  {
    id: "28",
    name: " кладка плитки душевая ГКС ",
    comment: "",
    id_sl: "16-а00229",
  },
  {
    id: "29",
    name: " Контроль плотности топки котлов ",
    comment: "",
    id_sl: "16-а00133",
  },
];

app.listen(5000, () => {
  console.log("server is running");
});
