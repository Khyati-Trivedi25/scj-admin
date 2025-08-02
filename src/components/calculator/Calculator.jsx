import React, { useState } from "react";

const CalculatorContainer = () => {
  const [selectedPlatform] = useState("YouTube");
  const [currency] = useState("INR");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-lg p-8 border border-neutral-800">
        <h2 className="text-2xl font-bold mb-6 text-white text-center tracking-tight">Professional Calculator</h2>
        <form className="space-y-6">
          <div className="mb-4">
            <p>Platform: {selectedPlatform}</p>
          </div>
          <div className="mb-4">
            <p>Currency: {currency}</p>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 via-pink-500 to-red-500 text-white shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            disabled
          >
            Calculate (Demo)
          </button>
        </form>
      </div>
    </div>
  );
};

export default CalculatorContainer; 