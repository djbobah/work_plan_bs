import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import Table from "./Table";
import { getToday, getTommorow } from "../utils/DateTimeFunctions";
// import api from "../api";
import axios from "axios";
import styles from "./workPlan.module.css";
import { columnsPlans } from "../utils/columnsPlans";

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
  const [department, setDepartment] = useState();

  const [contractingOrganization, setContractingOrganization] = useState();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [checkButtons, setCheckButtons] = useState([
    { title: "Все подразделения", name: "AllUnits", id: 1, checked: false },
    {
      title: "Только с транспортом",
      name: "OnlyWithAuto",
      id: 2,
      checked: false,
    },
    {
      title: "Только с опасными работами",
      name: "OnlyWithDangerWork",
      id: 3,
      checked: false,
    },
  ]);

  // console.log("checkButtons", checkButtons);

  const handleCheckClick = (checkId) => {
    let newCheckButtons = checkButtons.map((checkButton) =>
      checkButton.id === checkId
        ? {
            title: checkButton.title,
            name: checkButton.name,
            id: checkButton.id,
            checked: !checkButton.checked,
          }
        : checkButton
    );
    setCheckButtons(newCheckButtons);
  };
  useEffect(() => {
    // получаем данные о виде работ из БД
    axios
      .get("http://localhost:5000/api/users/department")
      .then((department) => {
        setDepartment(department.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  // useEffect(() => {
  let id_sl = checkButtons[0].checked ? 0 : localStorage.getItem("id_sl");
  // console.log("id_sl-------------------", id_sl);

  // }, [checkButtons]);
  useEffect(() => {
    // получаем данные о пользователях из БД

    axios
      .get("http://localhost:5000/api/users/user", {
        params: {
          id_sl: id_sl,
        },
      })
      .then((user) => {
        // console.log("user", user.data);
        setBrigada(user.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // получаем данные о планах работ из БД

    // console.log("rerender PLAN");
    axios
      .get("http://localhost:5000/api/plan/plan", {
        params: {
          id_sl: id_sl,
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

    // console.log("rerender VID RABOT");
  }, [DateFrom, DateEnd, showModalAdd, state, id_sl]);

  useEffect(() => {
    // получаем данные о виде работ из БД
    axios
      .get("http://localhost:5000/api/plan/vid", {
        params: {
          id_sl: id_sl,
        },
      })
      .then((vid) => {
        setWorks(vid.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id_sl]);
  useEffect(() => {
    // console.log("rerender OTHER");
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

  const columns = columnsPlans(id_sl);

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
    console.log("id", id);
    axios
      .delete(`http://localhost:5000/api/plan/${id}`)
      .then((i) => {
        console.log("put----------------------", i.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
            checkButtons={checkButtons}
            onCheck={handleCheckClick}
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
          // works &&
          // auto &&
          // objects &&
          // gn &&
          // brigada &&
          <Table
            columns={columns}
            rows={plans}
            works={works}
            objects={objects}
            auto={auto}
            gn={gn}
            brigada={brigada}
            department={department}
            onDelete={handleRowDelete}
            contractingOrganization={contractingOrganization}
            onEdit={edit}
            checkButtons={checkButtons}
          />
        ) : (
          <h1>
            При выбранных параметрах нет данных для отображения или на данный
            день нет планов...
          </h1>
        )}
      </div>
    </>
  );
};

export default WorkPlan;
