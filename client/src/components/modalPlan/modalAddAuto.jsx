import React, { useState, useEffect } from "react";
// import { validator } from "../../utils/validator";
// import CreatableSelect from "react-select/creatable";
import _ from "lodash";
import {
  // data,
  Modal,
  // Button,
  // InputGroup,
  Form,
  Row,
  Col,
  // FloatingLabel,
} from "react-bootstrap";
import { convertDate } from "../../utils/DateTimeFunctions";
import Select from "react-select";
// import CreatableSelectModal from "./creatableSelectModal";
// import SelectModal from "./SelectModal";
// import MultiSelectModal from "./multiSelectModal";
// import axios from "axios";

const ModalAddAuto = ({
  data,
  setData,
  department,
  objects,
  works,
  auto,
  gn,
  brigada,
  show,
  onClose,
  changeTypeAuto,
  setChangeTypeAuto,

  // onEdit,
  onSubmit,
}) => {
  // const [changeTypeAuto, setChangeTypeAuto] = useState(false);
  // const [optionsBrigadier, setOptionsBrigadier] = useState([]);
  // console.log("data", data);
  // console.log("id_sl", data.id_sl);

  const filteredDepartment = department?.filter(
    (dept) => dept.id_sl === data.id_sl
  )[0];

  // console.log("objects", objects);
  // data.objectForWork.value!==null?
  const filteredObject = objects?.filter(
    (obj) => obj.id === data.objectForWork.value
  )[0];

  const filteredWork = works?.filter(
    (work) => work.id === data.typeOfWork.value
  )[0];

  let filteredAuto = null;
  // console.log("typeof auto", data.auto);
  if (data.auto !== null) {
    const filteredCar = auto?.filter((car) => data.auto.value === car.id)[0];
    filteredAuto = { value: filteredCar?.id, label: filteredCar?.name };
  } else {
    filteredAuto = { value: 1, label: "Нет необходимости" };
  }

  // console.log("gn", gn);
  const sortedAuto = _.orderBy(auto, "name", "asc");
  const optionsAuto = sortedAuto?.map((auto) => ({
    label: auto.name,
    value: auto.id,
  }));

  const handleChangeAuto = (target) => {
    // console.log("target", target);
    target
      ? setData((prevState) => ({
          ...prevState,
          auto: { value: target.value, label: target.label },
          gn: null,
        }))
      : setData((prevState) => ({
          ...prevState,
          auto: null,
          gn: null,
          driver: null,
        }));
  };

  const filteredGn = gn?.filter(
    (item) => item.archive !== "1" && item.type === data.auto?.value
  );
  let optionsGn = filteredGn?.map((item) => ({
    label: item.marka + " " + item.nomer,
    value: item.id,
  }));
  optionsGn?.unshift({
    label: "Нет возможности",
    value: 1,
  });
  const handleChangeGn = (target) => {
    target
      ? setData((prevState) => ({
          ...prevState,
          gn: { value: target.value, label: target.label },
        }))
      : setData((prevState) => ({
          ...prevState,
          gn: null,
        }));
  };
  const filteredBrigada = brigada?.filter(
    (member) => member.id_sl === localStorage.getItem("id_sl")
  );
  const optionsBrigada = filteredBrigada?.map((member) => ({
    label: member.fio,
    value: member.id,
  }));

  const handleChangeDriver = (target) => {
    // console.log("tyarget", target);
    target
      ? setData((prevState) => ({
          ...prevState,
          driver: { value: target.value, label: target.label },
        }))
      : setData((prevState) => ({
          ...prevState,
          driver: null,
        }));
  };

  const handleChangeComment = ({ target }) => {
    // console.log("target", target);
    setData((prevState) => ({
      ...prevState,
      comment: target.value,
    }));
  };
  // console.log("data", data);

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
            <Row className="mb-3">
              <Col>
                <Form.Label className="text-muted">
                  Заявленный тип транспорта:
                </Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Text className="text-primary fs-6 text-end">
                  {/* <div className="row "> */}
                  <div className="d-flex ">
                    {!changeTypeAuto ? (
                      <div style={{ width: "100%" }}>{filteredAuto?.label}</div>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <Select
                          name="auto"
                          isClearable
                          placeholder="Выберите тип авто..."
                          options={optionsAuto}
                          value={data.auto}
                          onChange={handleChangeAuto}
                        />
                      </div>
                    )}
                    <div>
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
                      {/* </div> */}
                    </div>
                  </div>
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label className="text-muted">
                  Марка, гос. номер:
                </Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Text className="text-primary fs-6 text-end">
                  {/* <div className="row "> */}

                  <div style={{ width: "100%" }}>
                    <Select
                      name="gn"
                      isClearable
                      placeholder="Выберите автомобиль..."
                      options={optionsGn}
                      value={data.gn}
                      onChange={handleChangeGn}
                    />
                  </div>
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label className="text-muted">Водитель:</Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Text className="text-primary fs-6 text-end">
                  {/* <div className="row "> */}

                  <div style={{ width: "100%" }}>
                    <Select
                      name="brigada"
                      isClearable
                      placeholder="Выберите водителя..."
                      options={optionsBrigada}
                      value={data.driver}
                      onChange={handleChangeDriver}
                    />
                  </div>
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label className="text-muted">Комментарий:</Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="comment"
                  value={data.comment}
                  onChange={handleChangeComment}
                />
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
