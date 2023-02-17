import React, { useState, useEffect } from "react";
// import { validator } from "../../utils/validator";
// import CreatableSelect from "react-select/creatable";
import {
  data,
  Modal,
  Button,
  InputGroup,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { convertDate, getTommorow } from "../../utils/DateTimeFunctions";
import Select from "react-select";
import CreatableSelectModal from "./creatableSelectModal";
import SelectModal from "./SelectModal";
import MultiSelectModal from "./multiSelectModal";
import axios from "axios";

const ModalAddAuto = ({
  data,
  department,
  objects,
  works,
  show,
  onClose,

  // onEdit,
  onSubmit,
}) => {
  const [changeTypeAuto, setChangeTypeAuto] = useState(false);
  // const [optionsBrigadier, setOptionsBrigadier] = useState([]);
  console.log("data", data);
  // console.log("id_sl", data.id_sl);

  const filteredDepartment = department?.filter(
    (dept) => dept.id_sl === data.id_sl
  )[0];

  const filteredObject = objects?.filter(
    (obj) => obj.id === data.objectForWork.value
  )[0];

  const filteredWork = works?.filter(
    (work) => work.id === data.typeOfWork.value
  )[0];

  // console.log("filteredWork", filteredWork.name);
  // let optionsTypeOfWorksArray = works.map((work) => ({
  //   label: work.name,
  //   value: work.id,
  // }));
  // const optionsObjectForWork = objects?.map((object) => ({
  //   label: object.name,
  //   value: object.id,
  // }));

  // const optionsAuto = auto.map((auto) => ({
  //   label: auto.name,
  //   value: auto.id,
  // }));
  // const optionsContractingOrganization = contractingOrganization.map(
  //   (contract) => ({
  //     label: contract.name,
  //     value: contract.id,
  //   })
  // );
  // const handleChangeDate = ({ target }) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  // };

  // const handleChangeComment = ({ target }) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  // };
  // const handleCheck = ({ target }) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.checked,
  //   }));
  // };
  // const handleRadio = ({ target }) => {
  //   if (data[target.name]["name"] === "po") {
  //     setData((prevState) => ({
  //       ...prevState,
  //       [target.name]: { name: target.value, checked: target.checked },
  //       ["contractingOrganization"]: "",
  //     }));
  //     //   console.log("po");
  //   } else {
  //     // console.log("ss");
  //     setData((prevState) => ({
  //       ...prevState,
  //       [target.name]: { name: target.value, checked: target.checked },
  //     }));
  //   }
  // };

  // useEffect(() => {
  //   setOptionsBrigadier(data.brigada);
  // }, [data.brigada]);

  // const handleChange = (target) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  //   // console.log(target);
  // };

  // const onCreateOption = (target) => {
  //   if (target.name === "typeOfWork") {
  //     console.log("Creatable select name: ", target);
  //     target.id_sl = localStorage.getItem("id_sl");
  //     axios
  //       .post("http://localhost:5000/api/plan/work", target)
  //       .then((work) => {
  //         setData((prevState) => ({
  //           ...prevState,
  //           [target.name]: { label: work.data.name, value: work.data.id },
  //         }));
  //         // добавляю значение чтоб сразу появилось в списке
  //         works.push({
  //           comment: "",
  //           id: work.data.id,
  //           id_sl: localStorage.getItem("id_sl"),
  //           name: work.data.name,
  //         });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   } else if (target.name === "objectForWork") {
  //     console.log("Creatable select name: ", target);
  //     target.id_sl = localStorage.getItem("id_sl");

  //     axios
  //       .post("http://localhost:5000/api/plan/object", target)
  //       .then((object) => {
  //         console.log("post----------------------", object.data);
  //         console.log("post----------------------", object.data.id);
  //         setData((prevState) => ({
  //           ...prevState,
  //           [target.name]: { label: object.data.name, value: object.data.id },
  //         }));
  //         // добавляю значение чтоб сразу появилось в списке
  //         objects.push({
  //           comment: localStorage.getItem("id_sl"),
  //           id: object.data.id,
  //           name: object.data.name,
  //         });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   } else if (target.name === "contractingOrganization") {
  //     console.log("Creatable select name: ", target);
  //     target.id_sl = localStorage.getItem("id_sl");

  //     axios
  //       .post("http://localhost:5000/api/plan/contractingOrganization", target)
  //       .then((organization) => {
  //         setData((prevState) => ({
  //           ...prevState,
  //           [target.name]: {
  //             label: organization.data.name,
  //             value: organization.data.id,
  //           },
  //         }));
  //         // добавляю значение чтоб сразу появилось в списке
  //         contractingOrganization.push({
  //           comment: localStorage.getItem("id_sl"),
  //           id: organization.data.id,
  //           name: organization.data.name,
  //         });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // };

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
            Добавляем информацию об автомобиле...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Row className="mb-2">
              <Col>
                <Form.Label className="text-muted">Подразделение:</Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Text className="text-primary fs-6  ">
                  {filteredDepartment?.name}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Label className="text-muted">
                  Дата планируемой работы:
                </Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Text className="text-primary fs-6 ">
                  {convertDate(data.dateOfWork)}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Label className="text-muted">
                  Место проведения работ:
                </Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Text className="text-primary fs-6 ">
                  {filteredObject?.name}
                </Form.Text>
              </Col>
            </Row>{" "}
            <Row className="mb-2">
              <Col>
                <Form.Label className="text-muted">
                  Планируемые работы:
                </Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Text className="text-primary fs-6 ">
                  {filteredWork?.name}
                </Form.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Label className="text-muted">
                  Заявленный тип транспорта:
                </Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Text className="text-primary fs-6 text-end">
                  <div className="d-flex">
                    {!changeTypeAuto ? filteredWork?.name : <Select />}
                    <button
                      className="btn  btn-light  border-secondary p-1 ms-1"
                      type="button"
                      onClick={() => setChangeTypeAuto(!changeTypeAuto)}
                    >
                      <svg
                        width="20"
                        height="20"
                        color="primary"
                        fill="bg-secondary"
                        className="bi bi-pencil-square "
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                  </div>
                </Form.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Form.Group as={Col}>
                <button
                  className="btn btn-primary"
                  // disabled={!isValid}
                  type="submit"
                >
                  Сохранить
                </button>{" "}
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
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAddAuto;
