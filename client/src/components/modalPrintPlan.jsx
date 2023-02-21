import { Modal, Form, Row, Col } from "react-bootstrap";
import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { convertDate } from "../utils/DateTimeFunctions";

// const ComponentToPrint = () => {
//   return (
//     <div className="p-5">
//       <h2 style={{ color: "green" }}>Attendance</h2>
//       <table>
//         <thead>
//           <th>S/N</th>
//           <th>Name</th>
//           <th>Email</th>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>Njoku Samson</td>
//             <td>samson@yahoo.com</td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>Ebere Plenty</td>
//             <td>ebere@gmail.com</td>
//           </tr>
//           <tr>
//             <td>3</td>
//             <td>Undefined</td>
//             <td>No Email</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ;

const ModalPrintPlan = ({
  show,
  onShow,
  onClose,
  department,
  dateFrom,
  dateEnd,
}) => {
  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div className="p-5">
          <p style={{ color: "green" }}>{`План работ на период с ${convertDate(
            dateFrom
          )} по ${convertDate(dateEnd)}`}</p>
          <table>
            <thead>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Njoku Samson</td>
                <td>samson@yahoo.com</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ebere Plenty</td>
                <td>ebere@gmail.com</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Undefined</td>
                <td>No Email</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  const initialData = department.map((item) => ({
    value: item.id,
    name: item.name,
    checked: true,
  }));
  const [data, setData] = useState(initialData);
  const [AllDepartments, SetAllDepartments] = useState(true);
  // console.log("modal print data", data);

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
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
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
                  className="btn btn-primary"
                  // disabled={!isValid}
                  type="button"
                  onClick={handlePrint}
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
            <div>
              <ComponentToPrint ref={componentRef} />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPrintPlan;
