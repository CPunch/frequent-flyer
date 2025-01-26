import React from "react";
import Mapbox from "./map.jsx"; 
import Dropdown from "./Dropdown.jsx";
import Tool from "./Tool.jsx";
import Landing from "./Landing.jsx";

const App = () => {
  return (
    <div class="flex-col justify-center bg-radial-[at_25%_25%] from-white to-cyan-900 to-75%">
      <Tool className={`w-2/3 mx-auto`} />
      {/* <Landing className={`w-3/4 mx-auto`} /> */}
    </div>
  );
};

export default App;