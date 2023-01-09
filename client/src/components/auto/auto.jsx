import React, { useEffect } from "react";
import axios from "axios";

const Auto = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auto/auto")
      .then((avto) => {
        console.log("avto", avto.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://localhost:5000/api/auto/gn")
      .then((gn) => {
        console.log("gn", gn.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <h1>avto</h1>;
};

export default Auto;
