import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import Table from "./Table";
import { getToday, getTommorow } from "../utils/DateTimeFunctions";
// import api from "../api";
import axios from "axios";
import styles from "./workPlan.module.css";

const WorkPlan = () => {
  const [DateFrom, setDateFrom] = useState(getToday().toString());
  const [DateEnd, setDateEnd] = useState(getTommorow(DateFrom));
  const [toastShow, setToastShow] = useState(false);
  const [state, setState] = useState("");
  const [plans, setPlans] = useState();
  const [works, setWorks] = useState();
  const [objects, setObjects] = useState();
  const [auto, setAuto] = useState();
  const [gn, setGn] = useState();
  const [brigada, setBrigada] = useState();
  const [contractingOrganization, setContractingOrganization] = useState();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    // получаем данные о планах работ из БД

    console.log("rerender PLAN");
    axios
      .get("http://localhost:5000/api/plan/plan", {
        params: {
          id_sl: localStorage.getItem("id_sl"),
          dateFrom: DateFrom,
          dateEnd: DateEnd,
          state: state,
        },
      })
      .then((plan) => {
        setPlans(plan.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [DateFrom, DateEnd, showModalAdd, state]);
  useEffect(() => {
    console.log("rerender VID RABOT");
    // получаем данные о виде работ из БД
    axios
      .get("http://localhost:5000/api/plan/vid", {
        params: {
          id_sl: localStorage.getItem("id_sl"),
        },
      })
      .then((vid) => {
        setWorks(vid.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    console.log("rerender OTHER");
    // получаем данные об объектах  из БД
    axios
      .get("http://localhost:5000/api/plan/object")
      .then((object) => {
        setObjects(object.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // получаем данные о моделях автомобилей из БД
    axios
      .get("http://localhost:5000/api/auto/auto")
      .then((avto) => {
        setAuto(avto.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // получаем данные о автомобилях из БД
    axios
      .get("http://localhost:5000/api/auto/gn")
      .then((gn) => {
        setGn(gn.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // получаем данные о пользователях из БД
    axios
      .get("http://localhost:5000/api/users/user", {
        params: {
          id_sl: localStorage.getItem("id_sl"),
        },
      })
      .then((user) => {
        // console.log("gn", gn.data);
        setBrigada(user.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // получаем данные о подрядных организациях из БД
    axios
      .get("http://localhost:5000/api/plan/podr")
      .then((podr) => {
        setContractingOrganization(podr.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const columns = [
    { title: "№ п/п", path: "number", id: 1, width: 30 },
    { title: "Дата", path: "data_rabot", id: 2, width: 20 },
    { title: "Планируемые работы", path: "id_vid_rabot", id: 3, width: 200 },
    { title: "Способ проведения работ", path: "sposob", id: 4, width: 50 },
    { title: "Объект", path: "id_object", id: 5, width: 200 },
    {
      title: "Состав бригады / наименование подрядной организации",
      path: "Brigada",
      id: 6,
      width: 100,
    },
    { title: "Тип транспорта", path: "avto", id: 7, width: 0 },
    {
      title: "Cогласованный автомобиль Марка - Гос.№",
      path: "id_gn",
      id: 8,
      width: 0,
    },
    { title: "Комментарий", path: "comment", id: 9, width: 0 },
    {
      title: "Согласование работ повышенной опасности",
      path: "OPASN",
      id: 10,
      width: 100,
    },
    { title: "Отметка о выполнении", path: "vipolneno", id: 11, width: 0 },
    { title: "", path: "delete", id: 12, width: 0 },
  ];

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);

    // console.log("change datefrom ", DateFrom);
    setDateEnd(getTommorow(e.target.value));
  };
  const handleDateEndChange = (e) => {
    setDateEnd(e.target.value);
    if (DateFrom > e.target.value) {
      setToastShow(true);
    }
  };

  const handleToastClose = () => {
    setToastShow(false);
    setDateEnd(DateFrom);
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleRowDelete = (id) => {
    setPlans(plans.filter((row) => row.id !== id));
  };

  //console.log("WorkPlan", works);

  const handleClickAddShow = () => {
    setShowModalAdd(true);
  };
  const handleClickAddClose = () => {
    setShowModalAdd(false);
  };
  const handleChangeEdit = () => {
    setEdit(true);
  };
  const handleAdd = () => {
    setEdit(false);
  };
  return (
    <>
      <div className={styles["work-plan"]}>
        {works && contractingOrganization && auto && (
          <ControlPanel
            title="Панель действий"
            works={works}
            objects={objects}
            auto={auto}
            contractingOrganization={contractingOrganization}
            brigada={brigada}
            onShow={handleClickAddShow}
            onClose={handleClickAddClose}
            show={showModalAdd}
            dateFrom={DateFrom}
            onDateFromChange={handleDateFromChange}
            dateEnd={DateEnd}
            onDateEndChange={handleDateEndChange}
            toastShow={toastShow}
            onToastClose={handleToastClose}
            state={state}
            onChangeState={handleStateChange}
            edit={edit}
            onAdd={handleAdd}
            // onEdit={handleChangeEdit}
          />
        )}
        {/* works && auto && objects && gn && brigada && */}
        {works &&
        auto &&
        objects &&
        gn &&
        brigada &&
        objects &&
        plans &&
        plans.length > 0 ? (
          works &&
          auto &&
          objects &&
          gn &&
          brigada && (
            <Table
              columns={columns}
              rows={plans}
              works={works}
              objects={objects}
              auto={auto}
              gn={gn}
              brigada={brigada}
              onDelete={handleRowDelete}
              contractingOrganization={contractingOrganization}
              onEdit={edit}
            />
          )
        ) : (
          <h1>Загрузка...</h1>
        )}
      </div>
    </>
  );
};

export default WorkPlan;
