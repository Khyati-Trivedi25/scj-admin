import React from "react";

const CurrencyToggle = ({ currency, setCurrency }) => {
  return (
    <div className="scj-currency-toggle">
      <label>Select Currency</label>
      <div>
        <button
          onClick={() => setCurrency("INR")}
          className={currency === "INR" ? "active" : ""}
        >
          ₹ Rupees
        </button>
        <button
          onClick={() => setCurrency("USD")}
          className={currency === "USD" ? "active" : ""}
        >
          $ Dollars
        </button>
      </div>
    </div>
  );
};

export default CurrencyToggle; 