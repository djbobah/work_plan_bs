import React, { useState } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import CreatableSelectModal from "../modalPlan//creatableSelectModal";
// import SelectModal from "../modalPlan/selectModal";
// import MultiSelectModal from "../modalPlan//multiSelectModal";
import axios from "axios";

const initialData = { typeAuto: "", brandAuto: "", gnAuto: "", comment: "" };

const ModalAuto = ({ show, onClose, typeAuto }) => {
  const [data, setData] = useState(initialData);

  // console.log(typeAuto);
  const optionsTypeAuto = typeAuto.map((type) => ({
    label: type.name,
    value: type.id,
  }));

  const handleChange = (target) => {
    console.log(target);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // const isValid = validate();
    // if (!isValid) return;

    axios
      .post("http://localhost:5000/api/auto/auto", { data })
      .then((gn) => {
        console.log("gn", gn);
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log("edit id:", data);

    // console.log(data);

    onClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        size=""
      >
        <Modal.Header className="bg-primary" closeButton>
          <Modal.Title className="fs-5 text-dark">
            Добавляем автомобиль...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col}>
              <Form.Label className="text-muted">
                Выберите тип автомобиля
              </Form.Label>
              <CreatableSelectModal
                name="typeAuto"
                options={optionsTypeAuto}
                onChange={handleChange}
                // error={errors.typeOfWork}
                value={data.typeAuto}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-muted mt-3">
                Введите марку автомобиля
              </Form.Label>
              <Form.Control
                name="brandAuto"
                // options={optionsTypeAuto}
                onChange={handleChangeComment}
                // error={errors.typeOfWork}
                value={data.brandAuto}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-muted mt-3">
                Введите гос. номер автомобиля
              </Form.Label>
              <Form.Control
                name="gnAuto"
                // options={optionsTypeAuto}
                onChange={handleChangeComment}
                // error={errors.typeOfWork}
                value={data.gnAuto}
              />
            </Form.Group>
            <Form.Group className="mt-3 ">
              <Form.Label className="text-muted">Комментарий</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="comment"
                value={data.comment}
                onChange={handleChangeComment}
              />
            </Form.Group>
            <hr />
            {/* <Row> */}
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
            {/* </Row> */}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAuto;
