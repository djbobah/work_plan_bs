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
import CreatableSelectModal from "./creatableSelectModal";
import SelectModal from "./SelectModal";
import MultiSelectModal from "./multiSelectModal";
import axios from "axios";

const ModalAddAuto = ({
  data,

  show,
  onClose,

  // onEdit,
  onSubmit,
}) => {
  // const [optionsBrigadier, setOptionsBrigadier] = useState([]);
  // console.log("data", data);
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
      >
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title className="fs-5">
            "Добавляем информацию об автомобиле..."
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
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
