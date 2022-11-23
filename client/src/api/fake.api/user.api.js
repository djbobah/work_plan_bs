export const user = [
  { id: "1", tab: "", id_sl: "16-а00120", dolzhnost: "", fio: "" },
  {
    id: "2",
    tab: "401",
    id_sl: "16-а00121",
    dolzhnost: "Заместитель начальника управления",
    email: "v.igumencev",
    fio: "Байрак Александр Владимирович",
  },
  {
    id: "3",
    tab: "210",
    id_sl: "16-а00135",
    dolzhnost: "Начальник участка",
    email: "v.igumencev",
    fio: "Полухин Сергей Юрьевич",
  },
  {
    id: "4",
    tab: "701",
    id_sl: "16-а00129",
    dolzhnost: "Начальник службы",
    email: "v.igumencev",
    fio: "Сафронов Василий Владимирович",
  },
  {
    id: "5",
    tab: "159",
    id_sl: "16-а00134",
    dolzhnost: "Начальник службы",
    email: "v.igumencev",
    fio: "Сисюкин Павел Николаевич",
  },
  {
    id: "6",
    tab: "23",
    id_sl: "16-а00132",
    dolzhnost: "Начальник службы",
    email: "v.igumencev",
    fio: "Бондарев Анатолий Михайлович",
  },
  {
    id: "7",
    tab: "248",
    id_sl: "16-а00133",
    dolzhnost: "Начальник службы",
    email: "v.igumencev",
    fio: "Хализев Леонид Александрович",
  },
  {
    id: "8",
    tab: "84",
    id_sl: "16-а00131",
    dolzhnost: "Начальник службы",
    email: "v.igumencev",
    fio: "Похомов Сергей Александрович",
  },
  {
    id: "9",
    tab: "32",
    id_sl: "16-а00130",
    dolzhnost: "Начальник службы",
    email: "v.igumencev",
    fio: "Емельяненко Захар Геннадиевич",
  },
  {
    id: "10",
    tab: "228",
    id_sl: "16-а00128",
    dolzhnost: "Инженер 1 категории",
    email: "v.igumencev",
    fio: "Кривошлыков Михаил Сергеевич",
  },
  {
    id: "11",
    tab: "75",
    id_sl: "16-а00188",
    dolzhnost: "Начальник ДС",
    email: "v.igumencev",
    fio: "Игуменцев Валерий Владимирович",
  },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(user);
    }, 2000);
  });

export default {
  fetchAll,
};
