import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import api from "../api";

const Table = (props) => {
  //console.log(props.id);
  //console.log(props.title);
  const [plans, setPlans] = useState();
  useEffect(() => {
    api.plan.fetchAll().then((data) => setPlans(data));

    // console.log("useEffect", plans);
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
      path: "utv_opasn",
      id: 10,
      width: 100,
    },
    { title: "Отметка о выполнении", path: "vipolneno", id: 11, width: 0 },
    { title: "", path: "delete", id: 12, width: 0 },
  ];

  //console.log(columns)
  return (
    <div className="text-white flex  mx-auto  px-1 justify-between items-center ">
      <div className="border-stone-900 border mt-1 p-2 rounded text-black bg-gray-200">
        {plans ? (
          <table className="  border-collapse border-2 border-slate-800 border-rounded bg-gray-200">
            <TableHeader columns={columns} />
            <TableRows columns={columns} rows={plans} />
          </table>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};
export default Table;
