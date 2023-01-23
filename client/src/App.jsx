import NavBar from "./components/NavBar.jsx";
// import ControlPanel from "./components/ControlPanel";
// import ModalAdd from "./components/ModalAdd.jsx";
// import ToasT from "./components/Toast.jsx";
import WorkPlan from "./components/workPlan";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/dashBoard";
import Auto from "./components/auto/auto";

function App() {
  localStorage.setItem("id_sl", "16-а00134");
  localStorage.setItem(
    "name_sl",
    "Служба автоматизации и метрологического обеспечения"
  );
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/" element={<WorkPlan />} />
      </Routes>
    </>
  );
}

export default App;
