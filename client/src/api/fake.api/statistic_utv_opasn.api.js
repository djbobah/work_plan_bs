export const statistic_utv_opasn = [
  {
    id: "1",
    id_rab: "2",
    user: "v.igumencev",
    remote_addr: "10.27.27.110",
    date_utv: "2022-11-23",
    time_utv: "13:00:00",
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
