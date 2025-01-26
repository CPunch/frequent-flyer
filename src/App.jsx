import React from "react";
import MapboxExample from "./map.jsx"; 
import Dropdown from "./Dropdown.jsx";

const App = () => {
  return (
    <div>
      <div>
        <img src="src\assets\logo.png" class="justify-self-center w-100 md:w-160 lg:w-200" />
      </div>
      <div className="text-bold text-center text-3xl">Frequent Flyer</div>
      <div class="justify-self-center w-100 md:w-160 lg:w-200">
        <Dropdown />
      </div>
      <div style={{height: "500px"}} class="justify-self-center w-100 md:w-160 lg:w-200 border-5 border-solid border-gray-500 rounded-md">
        <MapboxExample />
      </div>
    </div>
  );
};

export default App;