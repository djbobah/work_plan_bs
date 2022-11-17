export const plan = [
  {
    id: "1",
    id_sl: "",
    id_object: "",
    id_vid_rabot: "",
    id_prdr_org: "",
    sposob: "",
    brigada: "",
    st_brigadi: "",
    avto: "",
    vipolneno: "",
    prochina_nevipol: "",
    data_rabot: "",
    comment: "",
    id_gn: "",
    opasn: "",
    utv_auto: "",
    utv_opasn: "",
  },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(plan);
    }, 2000);
  });

export default {
  fetchAll,
};
