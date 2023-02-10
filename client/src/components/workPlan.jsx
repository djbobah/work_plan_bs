import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import Table from "./Table";
import { getToday, getTommorow, getTime } from "../utils/DateTimeFunctions";
// import api from "../api";
import axios from "axios";
import styles from "./workPlan.module.css";
import { columnsPlans } from "../utils/columnsPlans";
import { validator } from "../utils/validator";

const initialData = {
  dateOfWork: getTommorow(),
  typeOfWork: "",
  isDanger: false,
  objectForWork: "",
  auto: null,
  methodOfWork: { name: "ss", checked: true },
  contractingOrganization: "",
  brigada: [],
  brigadier: "",
  comment: "",
};

const WorkPlan = () => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
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
  const [dangerWork, setDangerWork] = useState();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [edit, setEdit] = useState(0);
  // const [approveDangerWork, setApproveDangerWork] = useState(true);
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
          opasn: checkButtons[2].checked,
          auto: checkButtons[1].checked,
          dateFrom: DateFrom,
          dateEnd: DateEnd,
          state: state,
        },
      })
      .then((plan) => {
        setPlans(plan.data);
        // console.log("conditionWhere-------------", plan.conditionWhere);
      })
      .catch((e) => {
        console.log(e);
      });
    // получаем данные о опасных работах из БД
    axios
      .get("http://localhost:5000/api/danger/work")
      .then((work) => {
        setDangerWork(work.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log("rerender VID RABOT");
  }, [DateFrom, DateEnd, showModalAdd, state, checkButtons]);

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
  // console.log("dangerWork---------------------", dangerWork);
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

  const handleClickAddShow = () => {
    setEdit(0);
    setData(initialData);
    setShowModalAdd(true);
  };
  const handleClickAddClose = () => {
    setData(initialData);
    setShowModalAdd(false);
  };
  const handleChangeEdit = (id) => {
    console.log("edited work id: ", id);
    setEdit(id);
    setShowModalAdd(true);

    const filteredPlan = plans.filter((plan) => plan.id === id)[0];
    const filteredTypeOfWork = works.filter(
      (type) => type.id === filteredPlan.id_vid_rabot
    )[0];
    const filteredObject = objects.filter(
      (object) => object.id === filteredPlan.id_object
    )[0];

    const filteredAuto = auto.filter(
      (item) => item.id === filteredPlan.avto
    )[0];

    const dataAuto =
      filteredAuto.id === 1
        ? null
        : {
            label: filteredAuto.name,
            value: filteredAuto.id,
          };

    const filteredContractingOrganization = contractingOrganization.filter(
      (item) => item.id === filteredPlan.id_podr_org
    )[0];

    const dataContractingOrganization =
      filteredPlan.id_podr_org === 0
        ? 0
        : {
            label: filteredContractingOrganization.name,
            value: filteredContractingOrganization.id_podr_org,
          };

    let dataBrigada = [];
    if (filteredPlan.Brigada !== "") {
      const arrBrigada = filteredPlan.Brigada.split(";");

      arrBrigada.map((item) => {
        // console.log("item ", item);
        // console.log("brigada ", brigada);
        const filteredItem = brigada.filter(
          (member) => Number(member.id) === Number(item)
        )[0];

        dataBrigada.push({
          label: filteredItem.fio,
          value: filteredItem.id,
        });
      });
    }
    // console.log("dataBrigada", dataBrigada);

    const filteredBrigadier = brigada.filter(
      (item) => item.id === Number(filteredPlan.st_brigadi)
    )[0];
    const dataBrigadier =
      filteredPlan.st_brigadi === ""
        ? ""
        : {
            label: filteredBrigadier.fio,
            value: filteredBrigadier.id,
          };

    console.log("Brigada ", filteredPlan.Brigada);

    console.log("st_brigadi--- ", filteredBrigadier);
    //здесь нужно передавать данные
    setData({
      dateOfWork: filteredPlan.data_rabot,
      typeOfWork: {
        label: filteredTypeOfWork.name,
        value: filteredTypeOfWork.id,
      },
      isDanger: 1,
      objectForWork: { label: filteredObject.name, value: filteredObject.id },
      auto: dataAuto,

      methodOfWork: { name: filteredPlan.sposob, checked: true },
      contractingOrganization: dataContractingOrganization,
      brigada: dataBrigada,
      brigadier: dataBrigadier,
      comment: filteredPlan.comment,
    });

    // Brigada: "";
    // OPASN: 0;
    // Prichina_nevipol: "";
    // avto: 1;
    // comment: "";
    // data_rabot: "2023-02-10";
    // id: 33902;
    // id_gn: 0;
    // id_object: 1;
    // id_podr_org: 0;
    // id_sl: "16-а00135";
    // id_vid_rabot: 34;
    // sposob: "ss";
    // st_brigadi: "";
    // utv_avto: 0;
    // utv_opasn: 0;
    // vipolneno: 0;
  };
  const handleAdd = () => {
    setEdit(false);
  };

  const validatorConfig = {
    dateOfWork: {
      isCorrectDate: {
        message: "Дата не может быть меньше ",
      },
    },
    typeOfWork: {
      isRequired: { message: "Работа обязательна для заполнения" },
    },
    objectForWork: {
      isRequired: {
        message: "Место проведения работ обязательно для заполнения",
      },
    },
    auto: {
      // isCorrectDateAuto: {
      //   message: "Вы не можете заказать автомобиль на указанную дату ",
      // },
      isCorrectTimeAuto: {
        message:
          "Сегодня вы уже не можете заказать автомобиль. Ограничение по времени пн-чт до 15:00, пт до 14:00",
      },
    },

    contractingOrganization: {
      isRequiredPo: {
        message: "Наименование организации обязательно для заполнения",
      },
    },
    brigadier: {
      isRequiredBrigadier: {
        message: "Необходимо обязательно указать старшего бригады",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    // console.log("errors", errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const id_sl = localStorage.getItem("id_sl");
    axios
      .post("http://localhost:5000/api/plan/plan", { data, id_sl })
      .then((plan) => {
        // console.log("post------------", plan.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // console.log(data);
    setData(data);
    handleClickAddClose();
  };

  return (
    <>
      <div className={styles["work-plan"]}>
        {works && contractingOrganization && auto && plans && brigada && (
          <ControlPanel
            title="Панель действий"
            // plans={plans}
            data={data}
            setData={setData}
            errors={errors}
            isValid={isValid}
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
            onSubmit={handleSubmit}
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
        dangerWork &&
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
            dangerWork={dangerWork}
            onDelete={handleRowDelete}
            contractingOrganization={contractingOrganization}
            onEdit={handleChangeEdit}
            checkButtons={checkButtons}
            // onApprove={handleClickApprove}
          />
        ) : (
          <h1>нет данных для отображения или на данный день нет планов...</h1>
        )}
      </div>
    </>
  );
};

export default WorkPlan;
