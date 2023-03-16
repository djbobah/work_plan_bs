import { Modal, Form, Row, Col } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { convertDate } from "../utils/DateTimeFunctions";
import axios from "axios";
import { shortFio } from "../utils/fioUtils";
import ReactPDF from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import config from "../config.json";
import TableRowsPlan from "./tableRowsPlan";

function dataPodrToPrint(podr, plan, objects, works, brigada, gn) {
  let returnedArr = [];
  function brigabaFunc(brigada_id, st, brigada) {
    const idArr = brigada_id.split(";");
    // console.log("idArr---------------", idArr);
    let fioList = "";
    // console.log("brigada", brigada);

    idArr.map((id) => {
      if (id !== "") {
        if (id === st) {
          fioList +=
            shortFio(
              brigada?.filter((brigada) => brigada.id === Number(id))[0]?.fio
            ) + "(ст.), ";
        } else {
          fioList +=
            shortFio(
              brigada?.filter((brigada) => brigada.id === Number(id))[0]?.fio
            ) + ", ";
        }
      }
    });

    return (
      <>
        {/* <div className="text-bg-secondary rounded">{podrOrgName}</div> */}
        <div>{fioList.trim().slice(0, -1)}</div>
      </>
    );
  }

  function autoFunc(id_gn, gn) {
    const auto = gn.filter((auto) => auto.id === id_gn)[0];
    return auto.marka + " " + auto.nomer;
  }
  // console.log("plan", plan);
  // const auto=gn.filter.
  let current_date = "";

  const checkedDepartment = podr.filter((item) => item.checked);
  // console.log("checkedDepartment", checkedDepartment);

  let first = true;
  let current_id_sl = "";
  plan?.map((rowPlan, ind) => {
    if (current_id_sl !== rowPlan.id_sl) {
      first = true;
    }
    if (current_date !== rowPlan.data_rabot) {
      first = true;
      current_date = rowPlan.data_rabot;
      returnedArr.push(
        <tr key={rowPlan.id_sl + ind} className="bg-primary text-white">
          <td colSpan={5}>{`Работы на: ${convertDate(rowPlan.data_rabot)}`}</td>{" "}
        </tr>
      );
    }
    checkedDepartment.map((dep, i) => {
      //выводим если службы совпали и если работа не ОПАСНАЯ или ОПАСНАЯ РАБОТА согласована
      if (
        rowPlan.id_sl === dep.id_sl &&
        (rowPlan.OPASN === 0 ||
          (rowPlan.OPASN === 1 && rowPlan.utv_opasn === 1))
      ) {
        const opasn = rowPlan.OPASN === 1 ? " fw-bold" : "";
        returnedArr.push(
          // className={rowPlan.OPASN===1?"table-danger":""}
          <tr key={dep.id_sl + i + ind} className={`align-middle `}>
            {first ? (
              <td
                rowSpan={
                  plan.filter(
                    (item) =>
                      item.id_sl === dep.id_sl &&
                      item.data_rabot === rowPlan.data_rabot
                  ).length
                }
              >
                {dep.name}
              </td>
            ) : (
              ""
            )}
            <td className={opasn}>
              {
                objects?.filter((object) => object.id === rowPlan.id_object)[0]
                  .name
              }
            </td>
            <td className={opasn}>
              {works.filter((work) => work.id === rowPlan.id_vid_rabot)[0].name}
            </td>
            <td className={opasn}>
              {" "}
              {brigabaFunc(rowPlan.Brigada, rowPlan.st_brigadi, brigada)}
            </td>
            <td className={opasn}>{autoFunc(rowPlan.id_gn, gn)}</td>
          </tr>
        );
        first = false;
      }
    });
    current_id_sl = rowPlan.id_sl;
  });

  return returnedArr;
}

const ModalPrintPlan = ({
  show,
  onShow,
  onClose,
  department,
  objects,
  gn,
  dateFrom,
  dateEnd,
  allDepartments,
}) => {
  const initialData = department.map((item) => ({
    value: item.id,
    name: item.name,
    id_sl: item.id_sl,
    checked: true,
  }));
  const [data, setData] = useState(initialData);
  const [AllDepartments, SetAllDepartments] = useState(true);
  const [planData, setPlanData] = useState();
  const [works, setWorks] = useState();
  const [brigada, setBrigada] = useState();

  // получаем данные о планах работ из БД
  // console.log("rerender PLAN");
  useEffect(() => {
    axios
      .get(config.apiEndpoint + "plan/planForPrint", {
        params: {
          dateFrom: dateFrom,
          dateEnd: dateEnd,
        },
      })
      .then((plan) => {
        // console.log("returned plan", plan.data);
        // setPlanData(plan.data);
        // console.log("conditionWhere-------------", plan.conditionWhere);

        !allDepartments
          ? setPlanData(
              plan.data?.filter(
                (dep) => dep.id_sl === localStorage.getItem("id_sl")
              )
            )
          : setPlanData(plan.data);
        // console.log("allDepartments============", allDepartments);
        // console.log("planData============", planData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [data, show, allDepartments]);
  useEffect(() => {
    // получаем данные о виде работ из БД
    axios
      .get(config.apiEndpoint + "plan/vid", {
        params: {
          id_sl: 0,
        },
      })
      .then((vid) => {
        setWorks(vid.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // получаем данные о пользователях из БД
    axios
      .get(config.apiEndpoint + "users/user", {
        params: {
          id_sl: 0,
        },
      })
      .then((user) => {
        // console.log("user", user.data);
        setBrigada(user.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    // // !allDepartments && console.log("odno");
    // // setPlanData((prevState) =>
    // //   prevState?.filter((dep) => dep.id_sl === localStorage.getItem("id_sl"))
    // // );
    // setPlanData(
    //   planData?.filter((dep) => dep.id_sl === localStorage.getItem("id_sl"))
    // );
    // console.log("allDepartments============", allDepartments);
    // console.log("planData============", planData);
  }, [allDepartments]);

  // useEffect(() => {
  class ComponentToPrint extends React.Component {
    render() {
      return (
        //className="p-5"
        // <div>
        //   <p style={{ color: "green" }}>{`План работ на  ${convertDate(
        //     dateFrom
        //   )} `}</p>
        <table className="table table-bordered border text-center p-5">
          <thead className="bg-secondary">
            <th className="border">Служба</th>
            <th className="border">Объект</th>
            <th className="border">Вид работ</th>
            <th className="border">Исполнитель</th>
            <th className="border">Транспорт</th>
          </thead>
          <tbody>
            {dataPodrToPrint(data, planData, objects, works, brigada, gn).map(
              (item) => {
                return item;
              }
            )}
          </tbody>
        </table>
        // </div>
      );
    }
  }
  // }, [handlePrint]);

  const handleCheck = ({ target }) => {
    // console.log("target id",target.id);
    // console.log("target value",target.value);
    // console.log("checked",target.checked);

    setData(
      data.map((item) =>
        item.value === Number(target.value)
          ? { ...item, checked: target.checked }
          : item
      )
    );
  };
  const handleCheckAllDepartments = ({ target }) => {
    SetAllDepartments(target.checked);
    setData(data.map((item) => ({ ...item, checked: target.checked })));
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleClickPrint = () => {
    console.log("data", data);
    //получаем данные о планах работ

    handlePrint();
    onClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        // keyboard={false}
        size="lg"
        // size="md"
      >
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title className="fs-5">
            Выберите параметры для печати...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* //onSubmit={onSubmit} */}
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Все подразделения"
                  name="AllDepartments"
                  onChange={handleCheckAllDepartments}
                  id="AllDepartments"
                  value={AllDepartments}
                  checked={AllDepartments}
                />
              </Col>
            </Row>
            <hr />
            {data.map((item) => (
              <Row>
                <Col>
                  {/* <div className="form-check"> */}
                  <Form.Check
                    type="checkbox"
                    label={item.name}
                    name={item.name}
                    id={item.name + item.value}
                    onChange={handleCheck}
                    value={item.value}
                    // checked={data.isDanger}
                    checked={item.checked}
                  />
                  {/* </div> */}
                </Col>
              </Row>
            ))}
            <hr />
            <Row>
              <Form.Group as={Col}>
                <button
                  className="btn btn-primary me-2"
                  // disabled={!isValid}
                  type="button"
                  onClick={handleClickPrint}
                >
                  Печать
                </button>
                <button
                  className="btn btn-secondary"
                  // disabled={!isValid}
                  type="button"
                  onClick={onClose}
                >
                  Отмена
                </button>
              </Form.Group>
            </Row>
            {/* component to be printed */}
            {/* style={{ display: "none" }} */}
            <div style={{ display: "none" }}>
              <ComponentToPrint ref={componentRef} />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPrintPlan;
