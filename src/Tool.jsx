import { useState } from 'react'
import Mapbox from "./map.jsx";
import Dropdown from "./Dropdown.jsx";

const Tool = ( { className } ) => {
    const [points, setPoints] = useState({
        startLat: 0,
        startLong: 0,
        endLat: 0,
        endLong: 0
    });

    return (
        <div className={`flex flex-col space-y-8 p-6 h-screen ${className}`}>
            <img src="src\assets\logo.png" className="mx-auto w-1/5"/>
            <Dropdown className="w-1/4 mx-auto" setPoints={setPoints} />
            <Mapbox className="flex-1 border-5 border-solid border-white-500 rounded-md" startLat={points.startLat} startLong={points.startLong} endLat={points.endLat} endLong={points.endLong}/>
        </div>
    );
};

export default Tool;