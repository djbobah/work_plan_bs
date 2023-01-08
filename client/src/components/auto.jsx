import React, { useEffect } from "react";
import axios from "axios";

const Auto = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/avto")
      .then((avto) => {
        console.log("test", avto.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <h1>avto</h1>;
};

export default Auto;
