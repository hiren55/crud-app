import React from 'react';

function TailwindTest() {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg text-center mt-8">
            <h2 className="text-3xl font-bold mb-2">Tailwind CSS is Working!</h2>
            <p className="text-lg">You can now use <span className="font-mono bg-white text-blue-600 px-2 py-1 rounded">tailwind</span> utility classes in your project.</p>
            <button className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition">Try it out!</button>
        </div>
    );
}

export default TailwindTest;
