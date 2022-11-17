export const vid_rabot = [
  { id: "17", name: "Токарные работы", comment: "", id_sl: "16-а00129" },
  { id: "16", name: "Слесарные работы", comment: "", id_sl: "16-а00129" },
  { id: "15", name: "Покраска оборудования", comment: "", id_sl: "16-а00129" },
  {
    id: "7",
    name: "Проведение ТО оборудования",
    comment: "",
    id_sl: "16-а00130",
  },
  {
    id: "8",
    name: "Проведение КР оборудования",
    comment: "",
    id_sl: "16-а00130",
  },
  { id: "14", name: "ТО ЗА", comment: "", id_sl: "16-а00129" },
  { id: "19", name: "ТО КИП и А ГРС", comment: "", id_sl: "16-а00134" },
  { id: "21", name: "ТО КИПиА", comment: "", id_sl: "16-а00134" },
  {
    id: "24",
    name: "Актуализация ПМЛЛА ОПО МГ",
    comment: "",
    id_sl: "16-а00140",
  },
  { id: "31", name: "Огневые работы", comment: "", id_sl: "16-а00132" },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(vid_rabot);
    }, 2000);
  });

export default {
  fetchAll,
};
