import { useState } from 'react'

const Landing = ( {className} ) => {
    return (
        <div className={`flex flex-col space-y-8 p-6 h-screen ${className ?? ''}`}>
            <img src="src\assets\logo.png" alt="Centered Image" class="w-32 h-32" />
            <button class="rounded-full">Save Changes</button>
        </div>
    )
};

export default Landing;