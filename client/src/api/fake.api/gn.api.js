export const gn = [
  {
    id: "1",
    type: "1",
    marka: "Нет",
    nomer: "возможности",
    archive: "",
    comment: "",
  },
  {
    id: "2",
    type: "4",
    marka: "УАЗ-3909",
    nomer: "Е443УУ36",
    archive: "",
    comment: "",
  },
  {
    id: "3",
    type: "3",
    marka: "ГАЗ-22171",
    nomer: "Р302СТ161",
    archive: "",
    comment: "",
  },
  {
    id: "4",
    type: "6",
    marka: "МАЗ-5337",
    nomer: "С938УВ36",
    archive: "",
    comment: "",
  },
  {
    id: "5",
    type: "5",
    marka: "ГАЗ-3110",
    nomer: "Н975УС36",
    archive: "",
    comment: "",
  },
  {
    id: "6",
    type: "2",
    marka: "ВАЗ-2121",
    nomer: "У201УО36",
    archive: "",
    comment: "",
  },
  {
    id: "7",
    type: "8",
    marka: "ГАЗ-22171",
    nomer: "Т028ОХ93",
    archive: "",
    comment: "",
  },
  {
    id: "8",
    type: "10",
    marka: "ГАЗ-32213",
    nomer: "Р053ММ23",
    archive: "",
    comment: "",
  },
  {
    id: "9",
    type: "16",
    marka: "КРАЗ-6510",
    nomer: "О943УР36",
    archive: "",
    comment: "",
  },
  {
    id: "10",
    type: "17",
    marka: "КАМАЗ КС-4572",
    nomer: "С936УВ36",
    archive: "",
    comment: "",
  },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(gn);
    }, 2000);
  });

export default {
  fetchAll,
};
