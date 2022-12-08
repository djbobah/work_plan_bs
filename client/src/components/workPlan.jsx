import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import Table from "./Table";
import api from "../api";

const WorkPlan = () => {
  const [plans, setPlans] = useState();
  const [works, setWorks] = useState();
  const [objects, setObjects] = useState();
  const [auto, setAuto] = useState();
  const [gn, setGn] = useState();
  const [brigada, setBrigada] = useState();
  useEffect(() => {
    api.plan.fetchAll().then((data) => setPlans(data));
    api.vid_rabot.fetchAll().then((work) => setWorks(work));
    api.object.fetchAll().then((object) => setObjects(object));
    api.avto.fetchAll().then((auto) => setAuto(auto));
    api.gn.fetchAll().then((gn) => setGn(gn));
    api.user.fetchAll().then((brigada) => setBrigada(brigada));
  }, []);

  const columns = [
    { title: "№ п/п", path: "number", id: 1, width: 30 },
    { title: "Дата", path: "data_rabot", id: 2, width: 20 },
    { title: "Планируемые работы", path: "id_vid_rabot", id: 3, width: 200 },
    { title: "Способ проведения работ", path: "sposob", id: 4, width: 50 },
    { title: "Объект", path: "id_object", id: 5, width: 200 },
    {
      title: "Состав бригады / наименование подрядной организации",
      path: "brigada",
      id: 6,
      width: 100,
    },
    { title: "Тип транспорта", path: "avto", id: 7, width: 0 },
    { title: "Марка - Гос.№", path: "id_gn", id: 8, width: 0 },
    { title: "Комментарий", path: "comment", id: 9, width: 0 },
    {
      title: "Согласование работ повышенной опасности",
      path: "opasn",
      id: 10,
      width: 100,
    },
    { title: "Отметка о выполнении", path: "vipolneno", id: 11, width: 0 },
    { title: "", path: "delete", id: 12, width: 0 },
  ];

  const handleRowDelete = (id) => {
    setPlans(plans.filter((row) => row.id !== id));
  };

  //console.log("WorkPlan", works);
  return (
    <>
      {works && <ControlPanel title="Панель действий" works={works} />}

      {plans && plans.length > 0 ? (
        <Table
          columns={columns}
          rows={plans}
          works={works}
          objects={objects}
          auto={auto}
          gn={gn}
          brigada={brigada}
          onDelete={handleRowDelete}
        />
      ) : (
        <h1>В выбранном периоде нет данных</h1>
      )}
    </>
  );
};

export default WorkPlan;
