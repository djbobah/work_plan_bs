import NavBar from "./components/NavBar.jsx";
// import ControlPanel from "./components/ControlPanel";
// import ModalAdd from "./components/ModalAdd.jsx";
// import ToasT from "./components/Toast.jsx";
import WorkPlan from "./components/workPlan";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/dashBoard";
import Auto from "./components/auto/auto";
import ChooseDep from "./components/ChooseDep.jsx";
import PrintPlan from "./components/modalPrintPlan.jsx";
import axios from "axios";

function App() {
  // localStorage.setItem("id_sl", "16-а00134");
  // localStorage.setItem(
  //   "name_sl",
  //   "Служба автоматизации и метрологического обеспечения"
  // );
  axios
    .get("http://localhost/auth.php")
    .then((plan) => {
      console.log("post------------", plan.data);
    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/auto" element={<Auto />} />
        {/* <Route path="/printPlan" element={<PrintPlan />} /> */}

        <Route path="/plan" element={<WorkPlan />} />
        <Route path="/" element={<ChooseDep />} />
      </Routes>
    </>
  );
}

export default App;
