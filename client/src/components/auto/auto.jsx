import React, { useEffect, useState } from "react";
import ModalAuto from "./modalAuto";
import axios from "axios";
import config from "../../config.json";

import deletePng from "../../static/img/delete.png";
// import editPng from "../../static/img/edit.png";
// import copyPng from "../../static/img/copy-two-paper-sheets-interface-symbol_icon-icons.com_73283.svg";

const initialData = {
  id: "",
  typeAuto: "",
  brandAuto: "",
  gnAuto: "",
  comment: "",
};
const Auto = () => {
  const [stateNumberAuto, setStateNumberAuto] = useState([]);
  const [showModalAuto, setShowModalAuto] = useState(false);
  const [edit, setEdit] = useState(false);
  const [typeAuto, setTypeAuto] = useState();
  const [data, setData] = useState(initialData);
  useEffect(() => {
    axios
      .get(config.apiEndpoint + "auto/auto")
      .then((avto) => {
        setTypeAuto(avto.data);
        // console.log("avto", avto.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(config.apiEndpoint + "auto/gn")
      .then((gn) => {
        // console.log("gn", gn.data);
        setStateNumberAuto(gn.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [showModalAuto]);

  // if (typeAuto) {
  const optionsTypeAuto = typeAuto?.map((type) => ({
    label: type.name,
    value: type.id,
  }));
  // }

  const filtredStateNumberAuto = stateNumberAuto
    ? stateNumberAuto.filter((number) => number.archive !== "1")
    : stateNumberAuto;
  const setType = (id) => {
    const filteredTypeAuto = typeAuto?.filter((number) => number.id === id);
    // console.log("type id ", id);
    // console.log(
    //   "filteredTypeAuto ",
    //   filteredTypeAuto && filteredTypeAuto[0].id
    // );
    if (filteredTypeAuto.length > 0) {
      return filteredTypeAuto[0].name || "";
    }
  };

  const onDelete = (id) => {
    setStateNumberAuto(
      filtredStateNumberAuto.filter((number) => number.id !== id)
    );
    axios
      .patch(config.apiEndpoint + "auto/delete", { id })
      .then((gn) => {
        console.log("put----------------------", gn.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // axios
    //   .put("http://localhost:5000/api/auto/auto/", { id: id })
    //   .then((gn) => {
    //     console.log("gn", gn);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    console.log("delete id:", id);
  };
  const onAddAuto = () => {
    setEdit(false);
    handleShowModalAuto();
    setData(initialData);
  };

  const onEditAuto = (id) => {
    setEdit(true);
    handleShowModalAuto();
    // console.log("edit id:", id);
    const editAuto = filtredStateNumberAuto.filter(
      (number) => number.id === id
    )[0];
    setData({
      id: id,
      typeAuto: {
        label: setType(editAuto.type),
        value: editAuto.type,
      },

      brandAuto: editAuto.marka,
      gnAuto: editAuto.nomer,
      comment: editAuto.comment,
    });

    //console.log("data", data);
  };
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
  const handleShowModalAuto = () => {
    console.log("show");
    setShowModalAuto(true);
  };
  const handleCloseModalAuto = () => {
    setShowModalAuto(false);
    setData(initialData);
  };
  return (
    <div className="container border rounded mt-3">
      <button className="btn btn-primary float-end mt-2" onClick={onAddAuto}>
        Создать новый автомобиль
      </button>
      <table className="table table-striped table-hover table-bordered caption-top border-rounded">
        <caption>Автомобили</caption>
        <thead className="table-dark">
          <tr>
            <th scope="col">№ п/п</th>
            <th scope="col">Тип автомобиля</th>
            <th scope="col">Марка</th>
            <th scope="col">Гос. номер</th>
            <th scope="col">Комментарий</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtredStateNumberAuto.map((number, index) => (
            <tr key={number.id}>
              <td>{index + 1}</td>
              <td>{setType(number.type)}</td>
              <td>{number.marka}</td>
              <td>{number.nomer}</td>
              <td>{number.comment}</td>
              <td>
                <div className="d-flex">
                  <button
                    className="btn btn-light border border-secondary rounded  m-2  p-1 "
                    onClick={() => onEditAuto(number.id)}
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
                  {/* <button
                    className="btn  btn-light border border-secondary rounded  m-2 p-1"
                    onClick={() => onDelete(number.id)}
                    disabled
                  >
                    <img
                      src={copyPng}
                      width="20px"
                      alt="Добавить копированием"
                    />
                  </button> */}
                  <button
                    className="btn btn-light border border-secondary rounded mt-2 mb-2 p-1"
                    onClick={() => onDelete(number.id)}
                  >
                    <img
                      src={deletePng}
                      width="20px"
                      alt="Поместить автомобиль в архив"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {typeAuto && (
        <ModalAuto
          show={showModalAuto}
          edit={edit}
          onClose={handleCloseModalAuto}
          onChange={handleChange}
          onChangeComment={handleChangeComment}
          optionsTypeAuto={optionsTypeAuto}
          data={data}
        />
      )}
    </div>
  );
};

export default Auto;
