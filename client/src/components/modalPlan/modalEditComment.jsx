import React, { useState, useEffect } from "react";
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

import Select from "react-select";

const ModalEditComment = ({
  show,
  onClose,
  data,
  // plans,
  // onEdit,
  newComment,
  onChange,
  onSubmit,
}) => {
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
          <Modal.Title className="fs-5">Редактируем коментарий...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col className="text-danger mb-3">
                Внимание!!! История изменения коментариев сохраняется!
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Label className="text-muted">Комментарий:</Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="comment"
                  value={newComment}
                  onChange={onChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Label className="text-muted">
                  Предыдущий коментарий:
                </Form.Label>
              </Col>
              <Col className="text-end">
                <Form.Control
                  disabled
                  as="textarea"
                  rows={4}
                  name="comment"
                  value={data?.comment}
                  // onChange={handleChangeComment}
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

export default ModalEditComment;
