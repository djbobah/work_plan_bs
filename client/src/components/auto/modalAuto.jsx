import React, { useState, useEffect } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import CreatableSelectModal from "../modalPlan//creatableSelectModal";
// import SelectModal from "../modalPlan/selectModal";
// import MultiSelectModal from "../modalPlan//multiSelectModal";
import axios from "axios";

const ModalAuto = ({
  show,
  onClose,
  optionsTypeAuto,
  onChange,
  data,
  edit,
  onChangeComment,
}) => {
  // console.log("data typeauto", optionsTypeAuto[1]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      console.log("edit");
      console.log(data);
      axios
        .put("http://localhost:5000/api/auto/auto", { data })
        .then((gn) => {
          console.log("put----------------------", gn.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      let result = axios
        .post("http://localhost:5000/api/auto/auto", { data })
        .then((gn) => {
          console.log("post------------", gn.data);
        })
        .catch((e) => {
          console.log(e);
        });
      console.log("result", result);
    }
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
                onChange={onChange}
                // error={errors.typeOfWork}
                // defaultValue={optionsTypeAuto[1]}
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
                onChange={onChangeComment}
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
                onChange={onChangeComment}
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
                onChange={onChangeComment}
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
