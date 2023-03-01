import React, { useState, useRef } from "react";
import NavCheckButton from "./NavCheckButton";
// import { getToday, getTommorow } from "../utils/DateTimeFunctions";
import AddImage from "../static/img/add.png";
import PrinterImage from "../static/img/printer.png";
import ExcelImage from "../static/img/Microsoft_Office_-_Excel.png";
import ModalAdd from "./modalPlan/modalAdd";
import styles from "./ControlPanel.module.css";
import Toast from "./Toast.jsx";
import ExcelJS from "exceljs";
import { ExportToXls } from "./exportToXls";
import PrintToPdf from "./printToPdf";
import { useReactToPrint } from "react-to-print";
import ModalPrintPlan from "./modalPrintPlan";
import { convertDate } from "../utils/DateTimeFunctions";
// import Toast from "./components/Toast.jsx";

const ControlPanel = ({
  data,
  setData,
  errors,
  isValid,
  plans,
  works,
  setWorks,
  objects,
  auto,
  gn,
  department,
  contractingOrganization,
  brigada,
  onShow,
  onClose,
  onSubmit,
  show,
  dateFrom,
  onDateFromChange,
  dateEnd,
  onDateEndChange,
  toastShow,
  onToastClose,
  state,
  onChangeState,
  edit,
  // onEdit,
  checkButtons,
  onCheck,
  showPrintPlan,
  onShowPrintPlan,
  onClosePrintPlan,
}) => {
  const handleClickExportToXls = () => {
    console.log("plans", plans);
    // const rows = plans.map((plan, i) => [
    //   i + 1,
    //   convertDate(plan.data_rabot),
    //   works.filter((work) => work.id === plan.id_vid_rabot)[0].name,
    //   plan.Brigada,
    //   objects.filter((object) => object.id === plan.id_object)[0].name,
    //   auto.filter((car) => car.id === plan.avto)[0].name,
    //   plan.id_gn,
    //   "",
    //   plan.comment,
    // ]);

    // console.log("rows", rows);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    worksheet.pageSetup.orientation = "landscape";
    worksheet.pageSetup.paperSize = 9;
    worksheet.pageSetup.fitToPage = true;
    worksheet.pageSetup.fitToWidth = 1;
    //     const worksheet = workbook.addWorksheet("sheet", {
    //       pageSetup: { paperSize: 9, orientation: "landscape" },
    //       // style: {
    //       //   font: {
    //       //     size: 12,
    //       //     name: "Times New Roman",
    //       //     family: 3,
    //       //   },
    //       // },
    //     });
    worksheet.pageSetup.margins = {
      left: 0.2,
      right: 0.1,
      top: 0.2,
      bottom: 0.2,
      // header: 0.3,
      // footer: 0.3,
    };

    worksheet.mergeCells("H1:I1");
    worksheet.getCell("H1").value = "УТВЕРЖДАЮ";
    worksheet.getCell("H1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H1").font = { bold: true };
    worksheet.mergeCells("H2:I2");
    worksheet.getCell("H2").value = "Главный инженер";
    worksheet.getCell("H2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H2").font = { bold: true };
    worksheet.mergeCells("H3:I3");
    worksheet.getCell("H3").value = "филиала Каменск-Шахтинское ЛПУМГ";
    worksheet.getCell("H3").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H3").font = { bold: true };
    worksheet.mergeCells("H4:I4");
    worksheet.getCell("H4").value = 'ООО "Газпром трансгаз Краснодар"';
    worksheet.getCell("H4").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H4").font = { bold: true };
    worksheet.mergeCells("H6:I6");
    worksheet.getCell("H6").value = "     __________________С.В. Колесников";
    worksheet.getCell("H6").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H6").font = { bold: true };
    worksheet.mergeCells("H7:I7");
    worksheet.getCell("H7").value = ' "____" _______________   2022 г.';
    worksheet.getCell("H7").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H7").font = { bold: true };

    worksheet.columns = [
      { width: 5 },
      { width: 15 },
      { width: 30 },
      { width: 20 },
      { width: 30 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];

    worksheet.addRow();
    worksheet.addRow();
    worksheet.addRow([
      "№ п/п",
      "Дата поездки",
      "Цель поездки",
      "Пассажиры",
      "Место назначения",
      "Необходимый автомобиль ",
      "Марка, гос. номер выделенного автомобиля",
      "Изменение маршрута",
      "Примечание",
    ]);
    worksheet.getRow(10).font = { bold: true };
    worksheet.getRow(10).eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = {
        wrapText: true,
        vertical: "middle",
        horizontal: "center",
      };
    });
    let NRow = 10;
    plans.map((plan, i) => {
      if (plan.avto !== 1) {
        NRow++;
        worksheet.addRow([
          1,
          convertDate(plan.data_rabot),
          works.filter((work) => work.id === plan.id_vid_rabot)[0].name,
          "Пассажиры",
          objects.filter((object) => object.id === plan.id_object)[0].name,
          auto.filter((car) => car.id === plan.avto)[0].name,
          "Марка, гос. номер выделенного автомобиля",
          "Изменение маршрута",
          "Примечание",
        ]);

        // console.log("-----", 11 + i);
        worksheet.getRow(NRow).eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          cell.alignment = {
            wrapText: true,
            vertical: "middle",
            horizontal: "center",
          };
        });
      }
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        // default styles
        if (!cell.font?.size) {
          cell.font = Object.assign(cell.font || {}, { size: 12 });
        }
        if (!cell.font?.name) {
          cell.font = Object.assign(cell.font || {}, {
            name: "Times New Roman",
          });
        }
      });
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `План на ${dateFrom}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  return (
    <div
      className={`navbar navbar-expand-lg  justify-content-between fs-6   ${styles.nav}`}
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
            value={dateFrom}
            onChange={onDateFromChange}
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
            value={dateEnd}
            onChange={onDateEndChange}
            role="button"
          />
        </div>
        <Toast
          show={toastShow}
          message="Дата окончания периода не может быть меньше даты начала периода!"
          title="Внимание!!!"
          onToastClose={onToastClose}
        />
        <div>
          <label htmlFor="State" className="p-2">
            Состояние:
          </label>
          <select
            name="State"
            id="State"
            className={`m-1  border rounded ${styles.setMinHeight}`}
            value={state}
            onChange={onChangeState}
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
            onCheck={onCheck}
          />
        ))}
      </div>
      <div className="d-flex p-2 justify-content-between">
        <div
          className="border rounded p-1 me-2"
          onClick={onShow}
          role="button"
          title="Добавить строку плана..."
        >
          <img width={24} src={AddImage} alt="Запланировать работу..." />
        </div>

        <div
          className="border rounded p-1 me-2"
          role="button"
          title="Распечатать работы..."
          onClick={onShowPrintPlan}
        >
          <img width={24} src={PrinterImage} alt="Распечатать работы..." />{" "}
        </div>

        <div
          className="border rounded p-1 me-2"
          role="button"
          title="Выгрузить работы в Excel..."
          onClick={handleClickExportToXls}
        >
          <img width={24} src={ExcelImage} alt="Выгрузить работы в Excel..." />
          {/* <ExportToXls /> */}
        </div>
      </div>

      <ModalAdd
        data={data}
        setData={setData}
        errors={errors}
        isValid={isValid}
        edit={edit}
        // onEdit={onEdit}
        show={show}
        onShow={onShow}
        onClose={onClose}
        works={works}
        objects={objects}
        auto={auto}
        contractingOrganization={contractingOrganization}
        brigada={brigada}
        onSubmit={onSubmit}
        // plans={plans}
      />

      <ModalPrintPlan
        show={showPrintPlan}
        //  onShow={onShowPrintPlan}
        onClose={onClosePrintPlan}
        department={department}
        objects={objects}
        brigada={brigada}
        gn={gn}
        dateFrom={dateFrom}
        dateEnd={dateEnd}
      />
    </div>
  );
};

export default ControlPanel;
