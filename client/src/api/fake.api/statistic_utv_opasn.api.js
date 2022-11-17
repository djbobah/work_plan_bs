export const statistic_utv_opasn = [
  {
    id: "1",
    id_rab: "",
    user: "",
    remote_addr: "",
    date_utv: "",
    time_utv: "",
    comment: "",
  },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(statistic_utv_opasn);
    }, 2000);
  });

export default {
  fetchAll,
};
