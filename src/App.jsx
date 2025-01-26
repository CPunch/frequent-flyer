import React from "react";
import MapboxExample from "./map.jsx"; 
import Dropdown from "./Dropdown.jsx";

const App = () => {
  return (
    <div className="flex flex-col space-y-8 p-6 h-screen">
      <div className="flex items-center justify-center h-screen">
        <img src="src\assets\logo.png" className="justify-self-center w-100" />
        <div 
          className="relative h-[50vh] flex justify-center items-center"
          style={{
            backgroundImage: `url('/src/assets/cloud_background.png'), linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>
      </div>
      
      <div className="w-64 mx-auto">
        <Dropdown />
      </div>
      <div className="flex-1 border-5 border-solid border-white-500 rounded-md">
        <MapboxExample />
      </div>
    </div>
  );
};

export default App;