import React, { useState } from "react";
import NavCheckButton from "./NavCheckButton";
import { getToday, getTommorow } from "../utils/DateFunctions";
import AddImage from "../static/img/add.png";
import PrinterImage from "../static/img/printer.png";
import ExcelImage from "../static/img/Microsoft_Office_-_Excel.png";
import ModalAdd from "./ModalAdd";

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
    <div className="text-white flex bg-sky-700 border-t-2 border-b-1 h-10  mx-auto max-w-8xl px-1 sm:px-4 lg:px-8 justify-between items-center ">
      {/* <p className="">{ props.title}</p> */}
      <div className="relative justify-between sm:text-xs ">
        <div className="flex items-center">
          <div className="items-center text-center  pr-4">
            <label htmlFor="DateFrom">Период с: </label>
            <input
              type="date"
              name="DateFrom"
              id="DateFrom"
              className=" 1 h-8 text-sky-900 border rounded"
              value={DateFrom}
              onChange={handleDateFromChange}
            />

            <label htmlFor="DateEnd">по:</label>
            <input
              type="date"
              name="DateEnd"
              id="DateEnd"
              className="m-1 h-8 text-sky-900 border rounded"
              value={DateEnd}
              onChange={handleDateEndChange}
            />

            <label htmlFor="State" className="ml-2">
              Состояние:
            </label>
            <select
              name="State"
              id="State"
              className="m-1 h-8 text-sky-900 border rounded"
              value={State}
              onChange={handleStateChange}
            >
              <option>Все</option>
              <option>Выполнено</option>
              <option>Не выполнено</option>
            </select>
          </div>

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
      </div>
      <div className="flex items-center  ">
        <div
          className="border bg-sky-700 rounded p-1 text-green-500 cursor-pointer transition ease-in-out hover:-translate-y+1 hover:scale-105   duration-200"
          onClick={handleClickAdd}
        >
          <img width={24} src={AddImage} alt="Запланировать работу..." />
        </div>

        <div className="border bg-sky-700 rounded m-1 p-1 text-green-500 cursor-pointer transition ease-in-out hover:-translate-y+1 hover:scale-105   duration-200">
          <img width={24} src={PrinterImage} alt="Распечатать работы..." />
        </div>
        <div className="border bg-sky-700 rounded p-1 text-green-500 cursor-pointer transition ease-in-out hover:-translate-y+1 hover:scale-105   duration-200">
          <img width={24} src={ExcelImage} alt="Выгрузить работы в Excel..." />
        </div>
      </div>
      {/* <ModalAdd showModalAdd={showModalAdd} /> */}
    </div>
  );
};

export default ControlPanel;
