import NavBar from "./components/NavBar.jsx";
import ControlPanel from "./components/ControlPanel";
import ModalAdd from "./components/ModalAdd.jsx";
import ToasT from "./components/Toast.jsx";

function App() {
  return (
    <div className="App">
      {/* <ToasT show={true} /> */}
      <NavBar />

      <ControlPanel title="Панель действий" />
    </div>
  );
}

export default App;
