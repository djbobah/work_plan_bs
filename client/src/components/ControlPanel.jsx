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
// import Toast from "./components/Toast.jsx";

const ControlPanel = ({
  data,
  setData,
  errors,
  isValid,
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
    const workbook = new ExcelJS.Workbook();
    // const sheet = workbook.addWorksheet("My Sheet");
    const worksheet = workbook.addWorksheet("sheet", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
      style: {
        font: {
          size: 12,
          name: "Times New Roman",
          family: 3,
        },
      },
    });
    worksheet.pageSetup.margins = {
      left: 0.7,
      right: 0.7,
      top: 0.75,
      bottom: 0.75,
      header: 0.3,
      footer: 0.3,
    };
    worksheet.getCell("H1").font = {
      name: "Times New Roman",
      family: 3,
      size: 12,
    };
    worksheet.mergeCells("H1:I1");
    worksheet.getCell("H1").value = "Утверждаю";
    worksheet.getCell("H1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.mergeCells("H2:I2");

    worksheet.getCell("H2").value = "Главный инженер";
    worksheet.getCell("H2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.mergeCells("H3:I3");
    worksheet.getCell("H3").value = "филиала Каменск-Шахтинское ЛПУМГ";
    worksheet.getCell("H3").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.mergeCells("H4:I4");
    worksheet.getCell("H4").value = 'ООО "Газпром трансгаз Краснодар"';
    worksheet.getCell("H4").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("H6:I6");
    worksheet.getCell("H6").value = "     __________________С.В. Колесников";
    worksheet.getCell("H6").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.mergeCells("H7:I7");
    worksheet.getCell("H7").value = ' "____" _______________   2022 г.';
    worksheet.getCell("H7").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    // add a table to a sheet
    worksheet.addTable({
      name: "MyTable",
      ref: "A10",
      headerRow: true,
      // totalsRow: true,
      style: {
        theme: "TableStyleDark3",
        showRowStripes: true,
      },
      columns: [
        { name: "№ п/п" },
        { name: "Дата поездки" },
        // { name: "Date", totalsRowLabel: "Totals:", filterButton: true },
        // { name: "Amount", totalsRowFunction: "sum", filterButton: false },
      ],
      rows: [
        [new Date("2019-07-20"), 70.1],
        [new Date("2019-07-21"), 70.6],
        [new Date("2019-07-22"), 70.1],
      ],
    });
    // sheet.getRow(1).border = {
    //   top: { style: "thick", color: { argb: "FFFF0000" } },
    //   left: { style: "thick", color: { argb: "000000FF" } },
    //   bottom: { style: "thick", color: { argb: "F08080" } },
    //   right: { style: "thick", color: { argb: "FF00FF00" } },
    // };

    // sheet.getRow(1).fill = {
    //   type: "pattern",
    //   pattern: "darkVertical",
    //   fgColor: { argb: "FFFF00" },
    // };

    // sheet.getRow(1).font = {
    //   name: "Times New Roman",
    //   family: 3,
    //   size: 12,
    //   // bold: true,
    // };

    // const rowValues = [];
    // rowValues[1] = 4;
    // rowValues[5] = "Kyle";
    // rowValues[9] = new Date();
    // worksheet.addRow(rowValues);

    // sheet.columns = [
    //   {
    //     header: "Id",
    //     key: "id",
    //     width: 10,
    //   },
    //   { header: "Title", key: "title", width: 32 },
    //   {
    //     header: "Brand",
    //     key: "brand",
    //     width: 20,
    //   },
    //   {
    //     header: "Category",
    //     key: "category",
    //     width: 20,
    //   },
    //   {
    //     header: "Price",
    //     key: "price",
    //     width: 15,
    //   },
    //   {
    //     header: "Rating",
    //     key: "rating",
    //     width: 10,
    //   },
    //   {
    //     header: "Photo",
    //     key: "thumbnail",
    //     width: 30,
    //   },
    // ];

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
