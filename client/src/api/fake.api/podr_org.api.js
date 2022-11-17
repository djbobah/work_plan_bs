export const podr_org = [
  { id: "1", name: "Оргэнергогаз", comment: "" },
  { id: "2", name: "Региональные системы", comment: "" },
  { id: "4", name: "Инвестсстрой", comment: "" },
  { id: "5", name: "Смоленское УАВР", comment: "" },
  { id: "6", name: "ООО ГТК ИТЦ", comment: "" },
  { id: "7", name: "СИБЭКС", comment: "" },
  { id: "9", name: "Ростовский ЭТЛ", comment: "" },
  { id: "10", name: "ЭТЛ ИТЦ", comment: "" },
  { id: "11", name: "ГАЗМАШПРОЕКТ", comment: "" },
  { id: "12", name: "Центрэнергогаз", comment: "" },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(podr_org);
    }, 2000);
  });

export default {
  fetchAll,
};
