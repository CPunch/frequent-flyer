import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import MapboxExample from "./map.jsx";
import Dropdown from "./Dropdown.jsx";

const Tool = ( {className} ) => {
    return (
        <div className={`flex flex-col space-y-8 p-6 h-screen ${className}`}>
            <img src="src\assets\logo.png" className="justify-self-center w-100" />
            <Dropdown className="w-64 mx-auto"/>
            <MapboxExample className="flex-1 border-5 border-solid border-white-500 rounded-md"/>
        </div>
    );
};

export default Tool;