import React from "react";

const CurrencySymbol = ({ currency }) => {
  return <>{currency === "INR" ? "₹" : "$"}</>;
};

export default CurrencySymbol; 