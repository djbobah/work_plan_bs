import React, { useState } from "react";
import NavCheckButton from "./NavCheckButton";
import { getToday, getTommorow } from "../utils/DateTimeFunctions";
import AddImage from "../static/img/add.png";
import PrinterImage from "../static/img/printer.png";
import ExcelImage from "../static/img/Microsoft_Office_-_Excel.png";
import ModalAdd from "./modalPlan/modalAdd";
import styles from "./ControlPanel.module.css";
import Toast from "./Toast.jsx";
// import Toast from "./components/Toast.jsx";

const ControlPanel = ({ works, objects, auto, contractingOrganization }) => {
  const [DateFrom, setDateFrom] = useState(getToday().toString());
  const [DateEnd, setDateEnd] = useState(getTommorow(DateFrom));
  const [toastShow, setToastShow] = useState(false);
  const [State, setState] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
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
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

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

  const handleToastClose = () => {
    setToastShow(false);
    setDateEnd(DateFrom);
  };

  const handleClickAddShow = () => {
    setShowModalAdd(true);
  };
  const handleClickAddClose = () => {
    setShowModalAdd(false);
  };

  // console.log("cp works", works);

  return (
    <div
      className={`navbar navbar-expand-lg  justify-content-between    ${styles.nav}`}
    >
      <div className="d-flex">
        <div>
          <label htmlFor="DateFrom" className={"p-2"}>
            Период с:{" "}
          </label>
          <input
            type="date"
            name="DateFrom"
            id="DateFrom"
            className={`m-1  border rounded ${styles.setMinHeight}`}
            value={DateFrom}
            onChange={handleDateFromChange}
            role="button"
          />
        </div>
        <div>
          <label htmlFor="DateEnd" className={"p-2"}>
            по:
          </label>
          <input
            type="date"
            name="DateEnd"
            id="DateEnd"
            className={`m-1  border rounded ${styles.setMinHeight}`}
            value={DateEnd}
            onChange={handleDateEndChange}
            role="button"
          />
        </div>
        <Toast
          show={toastShow}
          message="Дата окончания периода не может быть меньше даты начала периода!"
          title="Внимание!!!"
          onToastClose={handleToastClose}
        />
        <div>
          <label htmlFor="State" className="p-2">
            Состояние:
          </label>
          <select
            name="State"
            id="State"
            className={`m-1  border rounded ${styles.setMinHeight}`}
            value={State}
            onChange={handleStateChange}
            role="button"
          >
            <option>Все</option>
            <option>Выполнено</option>
            <option>Не выполнено</option>
          </select>
        </div>
      </div>
      <div className="d-flex">
        {checkButtons.map((checkButton) => (
          <NavCheckButton
            title={checkButton.title}
            name={checkButton.name}
            id={checkButton.id}
            key={checkButton.id}
            check={checkButton.checked}
            onCheck={handleCheckClick}
          />
        ))}
      </div>
      <div className="d-flex p-2 justify-content-between">
        <div
          className="border rounded p-1 me-2"
          onClick={handleClickAddShow}
          role="button"
        >
          <img width={24} src={AddImage} alt="Запланировать работу..." />
        </div>

        <div className="border rounded p-1 me-2" role="button">
          <img width={24} src={PrinterImage} alt="Распечатать работы..." />
        </div>
        <div className="border rounded p-1 me-2" role="button">
          <img width={24} src={ExcelImage} alt="Выгрузить работы в Excel..." />
        </div>
      </div>
      <ModalAdd
        show={showModalAdd}
        onShow={handleClickAddShow}
        onClose={handleClickAddClose}
        works={works}
        objects={objects}
        auto={auto}
        contractingOrganization={contractingOrganization}
      />
    </div>
  );
};

export default ControlPanel;
