import MapboxExample from "./map.jsx";
import Dropdown from "./Dropdown.jsx";

const App = () => {
  return (
    <div>
      <div className="text-bold text-center text-3xl">hiiii :D</div>
      <div style={{height: "500px"}}>
        <Dropdown />
        <MapboxExample />
      </div>
    </div>
  );
};

export default App;