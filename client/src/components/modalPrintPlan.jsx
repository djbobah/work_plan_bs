import { Modal, Form, Row, Col } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { convertDate } from "../utils/DateTimeFunctions";
import axios from "axios";
import { shortFio } from "../utils/fioUtils";
import ReactPDF from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

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

  // const auto=gn.filter.

  podr.map((sl, i) => {
    let numb = 1;
    let first = true;
    plan?.map((rowPlan, ind) => {
      if (sl.id_sl === rowPlan.id_sl) {
        if (first) {
          if (sl.checked) {
            returnedArr.push(
              <tr key={i} className="bg-light">
                <td colSpan={5}>{sl.name}</td>{" "}
              </tr>
            );
          }
          first = false;
        }
        returnedArr.push(
          <tr key={i + ind}>
            <td>{numb}</td>
            <td>
              {
                objects?.filter((object) => object.id === rowPlan.id_object)[0]
                  .name
              }
            </td>
            <td>
              {works.filter((work) => work.id === rowPlan.id_vid_rabot)[0].name}
            </td>
            <td>{brigabaFunc(rowPlan.Brigada, rowPlan.st_brigadi, brigada)}</td>
            <td>{autoFunc(rowPlan.id_gn, gn)}</td>
          </tr>
        );
        numb++;
      }
    });
    numb = 0;
    first = true;
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
      .get("http://localhost:5000/api/plan/planForPrint", {
        params: {
          dateFrom: dateFrom,
          dateEnd: dateEnd,
        },
      })
      .then((plan) => {
        console.log("returned plan", plan.data);
        setPlanData(plan.data);
        // console.log("conditionWhere-------------", plan.conditionWhere);
      })
      .catch((e) => {
        console.log(e);
      });

    // получаем данные о виде работ из БД
    axios
      .get("http://localhost:5000/api/plan/vid", {
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
      .get("http://localhost:5000/api/users/user", {
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

  // useEffect(() => {
  class ComponentToPrint extends React.Component {
    render() {
      return (
        //className="p-5"
        <div>
          <p style={{ color: "green" }}>{`План работ на  ${convertDate(
            dateFrom
          )} `}</p>
          <table className="table table-bordered border text-center p-5">
            <thead className="bg-secondary">
              <th className="border">
                № <br />
                п/п
              </th>
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
        </div>
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
