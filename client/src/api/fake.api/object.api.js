export const object = [
  { id: "1", name: "КС Каменск-Шахтинская", comment: "" },
  { id: "2", name: "ГРС Донецк", comment: "" },
  { id: "3", name: "ГРС Митякинская", comment: "" },
  { id: "12", name: "Узел подключения КС", comment: "" },
  { id: "13", name: "Узел очистки газа", comment: "" },
  { id: "14", name: "ГПА №3,4", comment: "" },
  { id: "15", name: "РЭБ", comment: "" },
  { id: "16", name: "ГРС п.Коксовый", comment: "" },
  { id: "17", name: "ГРС п.Октябрьский", comment: "" },
  { id: "19", name: "КП ТМ 103", comment: "" },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(object);
    }, 2000);
  });

export default {
  fetchAll,
};
