import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SelectModal from "./modalPlan/SelectModal";
import axios from "axios";
import config from "../config.json";

const ChooseDep = () => {
  const [data, setData] = useState();
  const [department, setDepartment] = useState();
  useEffect(() => {
    // получаем данные о виде работ из БД
    axios
      .get(config.apiEndpoint + "users/department")
      .then((department) => {
        setDepartment(department.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const optionsDepartment = department?.map((department) => ({
    label: department.name,
    value: department.id,
  }));

  const handleChange = (target) => {
    console.log(target["value"].label);
    const id_sl = department.filter(
      (department) => target["value"].label === department.name
    );
    localStorage.setItem("id_sl", id_sl[0].id_sl);
    localStorage.setItem("name_sl", id_sl[0].name);
    localStorage.setItem("remoteUser", "user");
    localStorage.setItem("remoteAddress", "10.27.27.111");

    console.log(id_sl[0].id_sl);
    // setData()name_sl
  };
  console.log("department", department);

  return (
    <>
      <SelectModal
        name="department"
        label="Выберите службу..."
        options={optionsDepartment}
        onChange={handleChange}
        // error={errors.auto}
        // value={data.auto}
      />
      <Link className="navbar-brand" to="/plan">
        <div>
          {/* <img src={logo} width="50" height="50" alt="logo" /> */}
          <button className="btn btn-secondary">
            <span>ПЛАН РАБОТ</span>
          </button>
        </div>
      </Link>
    </>
  );
};

export default ChooseDep;
