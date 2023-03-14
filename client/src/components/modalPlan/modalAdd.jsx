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
import config from "../../config.json";

const ModalAdd = ({
  data,
  setData,
  errors,
  isValid,
  show,
  onShow,
  onClose,
  title,
  plans,
  works,
  objects,
  auto,
  contractingOrganization,
  brigada,
  edit,
  // onEdit,
  onSubmit,
}) => {
  const [optionsBrigadier, setOptionsBrigadier] = useState([]);

  let optionsTypeOfWorksArray = works.map((work) => ({
    label: work.name,
    value: work.id,
  }));
  const optionsObjectForWork = objects?.map((object) => ({
    label: object.name,
    value: object.id,
  }));

  const optionsAuto = auto.map((auto) => ({
    label: auto.name,
    value: auto.id,
  }));
  const optionsContractingOrganization = contractingOrganization.map(
    (contract) => ({
      label: contract.name,
      value: contract.id,
    })
  );
  const handleChangeDate = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleChangeComment = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleCheck = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.checked,
    }));
  };
  const handleRadio = ({ target }) => {
    if (data[target.name]["name"] === "po") {
      setData((prevState) => ({
        ...prevState,
        [target.name]: { name: target.value, checked: target.checked },
        ["contractingOrganization"]: "",
      }));
      //   console.log("po");
    } else {
      // console.log("ss");
      setData((prevState) => ({
        ...prevState,
        [target.name]: { name: target.value, checked: target.checked },
      }));
    }
  };

  useEffect(() => {
    setOptionsBrigadier(data.brigada);
  }, [data.brigada]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    // console.log(target);
  };

  const onCreateOption = (target) => {
    if (target.name === "typeOfWork") {
      // console.log("Creatable select name: ", target);
      target.id_sl = localStorage.getItem("id_sl");
      axios
        .post(config.apiEndpoint + "plan/work", target)
        .then((work) => {
          setData((prevState) => ({
            ...prevState,
            [target.name]: { label: work.data.name, value: work.data.id },
          }));
          // добавляю значение чтоб сразу появилось в списке
          works.push({
            comment: "",
            id: work.data.id,
            id_sl: localStorage.getItem("id_sl"),
            name: work.data.name,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (target.name === "objectForWork") {
      // console.log("Creatable select name: ", target);
      target.id_sl = localStorage.getItem("id_sl");

      axios
        .post(config.apiEndpoint + "plan/object", target)
        .then((object) => {
          // console.log("post----------------------", object.data);
          // console.log("post----------------------", object.data.id);
          setData((prevState) => ({
            ...prevState,
            [target.name]: { label: object.data.name, value: object.data.id },
          }));
          // добавляю значение чтоб сразу появилось в списке
          objects.push({
            comment: localStorage.getItem("id_sl"),
            id: object.data.id,
            name: object.data.name,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (target.name === "contractingOrganization") {
      // console.log("Creatable select name: ", target);
      target.id_sl = localStorage.getItem("id_sl");

      axios
        .post(config.apiEndpoint + "plan/contractingOrganization", target)
        .then((organization) => {
          setData((prevState) => ({
            ...prevState,
            [target.name]: {
              label: organization.data.name,
              value: organization.data.id,
            },
          }));
          // добавляю значение чтоб сразу появилось в списке
          contractingOrganization.push({
            comment: localStorage.getItem("id_sl"),
            id: organization.data.id,
            name: organization.data.name,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

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
            {edit === 0
              ? "Добавляем работу..."
              : `Редактируем работу id ${edit}...`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleFormControlInput1"
            >
              <Form.Label column sm="8" className="text-muted">
                Введите дату планируемой работы
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="date"
                  name="dateOfWork"
                  value={data.dateOfWork}
                  onChange={handleChangeDate}
                  isInvalid={errors.dateOfWork}
                />
                <Form.Control.Feedback type="invalid">
                  {errors &&
                    `${errors.dateOfWork} ${convertDate(getTommorow())}`}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Row className="mb-3">
              <Form.Label className="text-muted">Планируемые работы</Form.Label>
              <Form.Group as={Col}>
                <CreatableSelectModal
                  name="typeOfWork"
                  options={optionsTypeOfWorksArray}
                  onChange={handleChange}
                  error={errors.typeOfWork}
                  value={data.typeOfWork}
                  onCreateOption={onCreateOption}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  label="Работы повышенной опасности"
                  name="isDanger"
                  onChange={handleCheck}
                  value={data.isDanger}
                  checked={data.isDanger}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="text-muted">
                Место проведения работ
              </Form.Label>
              <Form.Group as={Col}>
                <CreatableSelectModal
                  name="objectForWork"
                  options={optionsObjectForWork}
                  onChange={handleChange}
                  error={errors.objectForWork}
                  value={data.objectForWork}
                  onCreateOption={onCreateOption}
                />
              </Form.Group>
            </Row>{" "}
            <Row className="mb-3">
              <Form.Label className="text-muted">
                Задействованный транспорт
              </Form.Label>
              <Form.Group as={Col}>
                <SelectModal
                  name="auto"
                  label="Выберите желаемый автомобиль(если необходимо)..."
                  options={optionsAuto}
                  onChange={handleChange}
                  error={errors.auto}
                  value={data.auto}
                />
              </Form.Group>
            </Row>
            <hr />
            <Row>
              {" "}
              <Form.Group as={Col}>
                <Form.Label className="text-muted">
                  Способ проведения работ
                </Form.Label>
                <Form.Check
                  // inline
                  label="Собственными силами"
                  name="methodOfWork"
                  type="radio"
                  id="ss"
                  onChange={handleRadio}
                  value="ss"
                  checked={data.methodOfWork.name === "ss"}
                  //  checked
                />
                <Form.Check
                  // inline
                  label="Подрядная организация"
                  name="methodOfWork"
                  type="radio"
                  id="po"
                  value="po"
                  onChange={handleRadio}
                  checked={data.methodOfWork.name === "po"}
                />
              </Form.Group>
              {data.methodOfWork.name === "po" && (
                <Form.Group as={Col}>
                  <Form.Label className="text-muted">
                    Наименование подрядной организации
                  </Form.Label>
                  <CreatableSelectModal
                    name="contractingOrganization"
                    options={optionsContractingOrganization}
                    onChange={handleChange}
                    error={
                      data.methodOfWork.name === "po"
                        ? errors.contractingOrganization
                        : undefined
                    }
                    value={data.contractingOrganization}
                    onCreateOption={onCreateOption}
                  />
                </Form.Group>
              )}
            </Row>
            <br />
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-muted">Состав бригады</Form.Label>
                {/* <SelectModal
                  name="auto"
                  options={optionsAuto}
                  onChange={handleChange}
                  error={errors.auto}
                /> */}
                {/* {console.log("brigada", brigada)} */}
                <MultiSelectModal
                  label="Выберите состав бригады"
                  onChange={handleChange}
                  name="brigada"
                  options={brigada}
                  value={data.brigada}
                />
              </Form.Group>{" "}
              <Form.Group as={Col}>
                <Form.Label className="text-muted">Старший</Form.Label>
                <SelectModal
                  name="brigadier"
                  label="Выберите старшего бригады..."
                  options={optionsBrigadier}
                  onChange={handleChange}
                  error={errors.brigadier}
                  value={data.brigadier}

                  ///
                  /// нужно добавить валидацию на пустое значение
                  ///
                />
              </Form.Group>
            </Row>
            <Row>
              {" "}
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Комментарий</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="comment"
                  value={data.comment}
                  onChange={handleChangeComment}
                />
              </Form.Group>
            </Row>
            <hr />
            <Row>
              <Form.Group as={Col}>
                <button
                  className="btn btn-primary"
                  disabled={!isValid}
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

export default ModalAdd;
