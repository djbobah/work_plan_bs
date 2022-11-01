import NavBar from "./components/NavBar.jsx";
import ControlPanel from "./components/ControlPanel";

function App() {
  return (
    <div className="App">
      <NavBar />

      <ControlPanel title="Панель действий" />
    </div>
  );
}

export default App;
