export const avto = [
  { id: "1", name: "", comment: "" },
  { id: "2", name: "Легковой повышенной проходимости", comment: "" },
  { id: "3", name: "Автобус 10 мест", comment: "" },
  { id: "4", name: "УАЗ грузопасажирский", comment: "" },
  { id: "5", name: "Легковой", comment: "" },
  { id: "6", name: "Грузовой автомобиль бортовой", comment: "" },
  { id: "8", name: "Автобус 6 мест", comment: "" },
  { id: "10", name: "Автобус дежурный 13 мест", comment: "" },
  { id: "16", name: "Самосвал", comment: "" },
  { id: "17", name: "Кран автомобильный", comment: "" },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(avto);
    }, 2000);
  });

export default {
  fetchAll,
};
