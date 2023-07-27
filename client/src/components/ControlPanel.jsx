import React, { useState, useEffect, useRef } from "react";
import NavCheckButton from "./NavCheckButton";
// import { getToday, getTommorow } from "../utils/DateTimeFunctions";
import AddImage from "../static/img/add.png";
import PrinterImage from "../static/img/printer.png";
import ExcelImage from "../static/img/Microsoft_Office_-_Excel.png";
import ModalAdd from "./modalPlan/modalAdd";
import styles from "./ControlPanel.module.css";
import Toast from "./Toast.jsx";
import ExcelJS from "exceljs";
import _ from "lodash";
import { ExportToXls } from "./exportToXls";
import PrintToPdf from "./printToPdf";
import { useReactToPrint } from "react-to-print";
import ModalPrintPlan from "./modalPrintPlan";
import { convertDate } from "../utils/DateTimeFunctions";
import { shortFio } from "../utils/fioUtils";
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
  const [sortedPlans, setSortedPlans] = useState(plans);
  // console.log("plans", plans);
  useEffect(() => {
    setSortedPlans(_.orderBy(plans, "data_rabot", "asc"));
  }, [plans]);

  const handleClickExportToXls = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    worksheet.pageSetup.orientation = "landscape";
    worksheet.pageSetup.paperSize = 9;
    worksheet.pageSetup.fitToPage = true;
    worksheet.pageSetup.fitToWidth = 1;
    worksheet.pageSetup.margins.left = 0.2;
    worksheet.pageSetup.margins.right = 0.2;
    worksheet.pageSetup.margins.top = 0.2;
    worksheet.pageSetup.margins.bottom = 0.2;

    const date = new Date();
    const year = date.getFullYear();

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
    worksheet.getCell("H6").value = "__________________С.В. Колесников";
    worksheet.getCell("H6").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H6").font = { bold: true };
    worksheet.mergeCells("H7:I7");
    worksheet.getCell("H7").value = `"____" _______________   ${year} г.`;
    worksheet.getCell("H7").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H7").font = { bold: true };

    worksheet.columns = [
      { width: 5 },
      { width: 15 },
      { width: 40 },
      { width: 30 },
      { width: 40 },
      { width: 21 },
      { width: 21 },
      { width: 23 },
      { width: 23 },
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
    let currentDepartment = "";
    let startNumb = 0;
    sortedPlans.map((plan, i) => {
      if (plan.avto !== 1) {
        NRow++;
        // const mergeStr="H"+NRow+":I"+NRow
        const filteedGn = gn.filter((car) => car.id === plan.id_gn)[0];

        //пассажиры
        const idArr = plan.Brigada.split(";");
        let fioList = "";
        idArr.map((id) => {
          if (id !== "") {
            if (id === plan.st_brigadi) {
              fioList +=
                shortFio(
                  brigada?.filter((brigada) => brigada.id === Number(id))[0]
                    ?.fio
                ) + "(ст.), ";
            } else {
              fioList +=
                shortFio(
                  brigada?.filter((brigada) => brigada.id === Number(id))[0]
                    ?.fio
                ) + ", ";
            }
          }
        });

        // выводим наименование подразделения
        if (currentDepartment !== plan.id_sl) {
          worksheet.addRow([
            department.filter((dep) => dep.id_sl === plan.id_sl)[0].name,
          ]);
          worksheet.mergeCells(`A${NRow}:I${NRow}`);
          worksheet.getCell(`A${NRow}`).font = { bold: true };
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

          NRow++;
          currentDepartment = plan.id_sl;
          startNumb = 1;
        }

        worksheet.addRow([
          startNumb,
          convertDate(plan.data_rabot),
          works.filter((work) => work.id === plan.id_vid_rabot)[0].name,
          fioList,
          objects.filter((object) => object.id === plan.id_object)[0].name,
          auto.filter((car) => car.id === plan.avto)[0].name,
          filteedGn.marka + " " + filteedGn.nomer,
          "",
          plan.comment,
        ]);
        startNumb++;
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

    worksheet.addRow();
    worksheet.addRow([
      "",
      "",
      "Начальник АТУ",
      "",
      "",
      "",
      "_______________  С.Ю. Полухин",
    ]);
    worksheet.getRow(NRow + 2).eachCell((cell) => {
      cell.font = { bold: true };
    });
    worksheet.addRow();
    worksheet.addRow([
      "",
      "",
      "Инженер по безопасности движения 1 категории",
      "",
      "",
      "",
      "_______________  В.В. Долженков",
    ]);
    worksheet.getRow(NRow + 4).eachCell((cell) => {
      cell.font = { bold: true };
    });
    worksheet.mergeCells(`C${NRow + 4}:D${NRow + 4}`);

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
        {!checkButtons[0].checked && (
          <div
            className="border rounded p-1 me-2"
            onClick={onShow}
            role="button"
            title="Добавить строку плана..."
          >
            <img width={24} src={AddImage} alt="Запланировать работу..." />
          </div>
        )}

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
        allDepartments={checkButtons[0].checked}
      />
    </div>
  );
};

export default ControlPanel;
