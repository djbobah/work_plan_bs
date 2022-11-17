export const sluzhba = [
  { id: "1", id_sl: "16-а00120", name: "Руководство", sort: "" },
  {
    id: "2",
    id_sl: "16-а00121",
    name: "Исполнители при руководстве",
    sort: "",
  },
  { id: "3", id_sl: "16-а00135", name: "Автотранспортный участок", sort: "" },
  { id: "4", id_sl: "16-а00129", name: "Хозяйственный участок", sort: "" },
  { id: "5", id_sl: "16-а00134", name: "Служба АиМО", sort: "" },
  { id: "6", id_sl: "16-а00132", name: "Служба по ЭГРС", sort: "" },
  { id: "7", id_sl: "16-а00133", name: "Служба ЭВС", sort: "" },
  { id: "8", id_sl: "16-а00131", name: "Служба ЗоК", sort: "" },
  { id: "9", id_sl: "16-а00130", name: "Служба ЛЭС", sort: "" },
  { id: "10", id_sl: "16-а00128", name: "Участок по ХР и МТС", sort: "" },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(sluzhba);
    }, 2000);
  });

export default {
  fetchAll,
};
