import express from "express";
import { works, auto, typeAuto } from "./fake_api/bd.js";

const app = express();

//console.log(works);

app.listen(5000, () => {
  console.log("server is running");
});
