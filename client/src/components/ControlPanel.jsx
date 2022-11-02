import React, { useState } from "react";
import NavCheckButton from "./NavCheckButton";
import { getToday, getTommorow } from "../utils/DateFunctions";
import AddImage from "../static/img/add.png";
import PrinterImage from "../static/img/printer.png";
import ExcelImage from "../static/img/Microsoft_Office_-_Excel.png";
import ModalAdd from "./ModalAdd";
import styles from "./ControlPanel.module.css";

const ControlPanel = (props) => {
  const [DateFrom, setDateFrom] = useState(getToday().toString());
  const [DateEnd, setDateEnd] = useState(getTommorow().toString());
  const [State, setState] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(true);
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
  };

  const handleDateEndChange = (e) => {
    setDateEnd(e.target.value);
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

  const handleClickAdd = () => {
    setShowModalAdd(!showModalAdd);
  };

  return (
    <div
      className={`navbar navbar-expand-lg  justify-content-between ${styles.nav}`}
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
            className="  border rounded "
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
            className="m-1 border rounded"
            value={DateEnd}
            onChange={handleDateEndChange}
            role="button"
          />
        </div>
        <div>
          <label htmlFor="State" className="p-2">
            Состояние:
          </label>
          <select
            name="State"
            id="State"
            className="m-1  border rounded"
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
          onClick={handleClickAdd}
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
      {/* <ModalAdd showModalAdd={showModalAdd} /> */}
    </div>
  );
};

export default ControlPanel;
