import { useState, button } from 'react'

const Landing = ( {className} ) => {
    return (
        <div className={`flex flex-col space-y-8 p-6 h-screen ${className ?? ''}`}>
            <img src="src\assets\logo.png" alt="Centered Image" class="w-1/4 md:w-1/4 lg:w-1/4" />
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Button
            </button>
        </div>
    )
};

export default Landing;