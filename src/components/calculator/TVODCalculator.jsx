import React, { useState } from "react";
import CurrencySymbol from "./CurrencySymbol";
import { AnalyticsStorage } from "../../utils/analyticsStorage";

const TVODCalculator = ({ currency }) => {
  const [inputs, setInputs] = useState({
    androidRent: "",
    androidBuy: "",
    iosRent: "",
    iosBuy: "",
    androidRentPrice: "",
    androidBuyPrice: "",
    iosRentPrice: "",
    iosBuyPrice: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [isTransmitted, setIsTransmitted] = useState(false);

  const parse = (val) => parseFloat(val) || 0;

  const calculateNet = (platformKey) => {
    const priceKey = platformKey + "Price";
    const ticketPrice = parse(inputs[priceKey]);
    const gst = ticketPrice * 0.18;
    const transactionFee = currency === "INR" ? 3 : 0.1;
    const isIOS = platformKey.includes("ios");
    const inAppFee = isIOS ? ticketPrice * 0.25 : 0;
    return ticketPrice - gst - transactionFee - inAppFee;
  };

  const calcRevenue = (platformKey) => {
    const streams = parse(inputs[platformKey]);
    const net = calculateNet(platformKey);
    return {
      streams,
      net,
      gross: streams * net,
    };
  };

  const androidRent = calcRevenue("androidRent");
  const androidBuy = calcRevenue("androidBuy");
  const iosRent = calcRevenue("iosRent");
  const iosBuy = calcRevenue("iosBuy");

  const totalRevenue =
    androidRent.gross + androidBuy.gross + iosRent.gross + iosBuy.gross;
  const platformShare = totalRevenue * 0.3;
  const netRevenue = totalRevenue - platformShare;

  const contentCreatorShare = netRevenue * 0.75 * 0.95; // 5% TDS
  const scjShare = netRevenue * 0.25;

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  const transmitToDashboard = () => {
    if (!showResults) return;
    
    const contentData = {
      id: Date.now(),
      title: `TVOD Revenue Calculation`,
      platform: "TVOD",
      views: androidRent.streams + androidBuy.streams + iosRent.streams + iosBuy.streams,
      revenue: netRevenue,
      impressions: androidRent.streams + androidBuy.streams + iosRent.streams + iosBuy.streams,
      grossRevenue: totalRevenue,
      netRevenue: netRevenue,
      platformShare: platformShare,
      creatorShare: contentCreatorShare,
      scjShare: scjShare,
      currency: currency,
      calculationType: "TVOD",
      androidRent: androidRent,
      androidBuy: androidBuy,
      iosRent: iosRent,
      iosBuy: iosBuy,
      timestamp: new Date().toISOString(),
      category: "Revenue Calculation",
      uploadDate: new Date().toISOString().split('T')[0],
      duration: "N/A",
      likes: 0,
      comments: 0,
      shares: 0
    };

    AnalyticsStorage.saveContentPerformance(contentData);
    setIsTransmitted(true);
    
    // Reset transmission status after 3 seconds
    setTimeout(() => setIsTransmitted(false), 3000);
  };

  return (
    <div className="scj-calculator-form">
      <h2>TVOD Revenue Calculator</h2>
      <form
        className="scj-form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          setShowResults(true);
        }}
      >
        {[
          ["androidRent", "Android Rent"],
          ["androidBuy", "Android Buy"],
          ["iosRent", "iOS Rent"],
          ["iosBuy", "iOS Buy"],
        ].map(([key, label]) => (
          <div
            key={key}
            className="scj-input-group"
          >
            {/* Streams */}
            <div className="scj-input-container">
              <span className="scj-input-label">
                {label} Streams
              </span>
              <input
                type="number"
                className="scj-input-field"
                value={inputs[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder="e.g. 100"
              />
            </div>
            {/* Price */}
            <div className="scj-input-container">
              <span className="scj-input-label">
                {label} Price ({currency})
              </span>
              <input
                type="number"
                className="scj-input-field"
                value={inputs[key + "Price"]}
                onChange={(e) => handleInputChange(key + "Price", e.target.value)}
                placeholder="e.g. 120 or 1.99"
              />
            </div>
          </div>
        ))}
        <div className="scj-submit-container">
          <button
            type="submit"
            className="scj-submit-button"
          >
            Calculate Revenue
          </button>
        </div>
      </form>

      {showResults && (
        <div className="scj-results">
          <h3>Results</h3>
          
          <div className="scj-result-item">
            <span className="scj-result-label">Android Rent Revenue:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {androidRent.gross.toFixed(2)}
            </span>
          </div>
          
          <div className="scj-result-item">
            <span className="scj-result-label">Android Buy Revenue:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {androidBuy.gross.toFixed(2)}
            </span>
          </div>
          
          <div className="scj-result-item">
            <span className="scj-result-label">iOS Rent Revenue:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {iosRent.gross.toFixed(2)}
            </span>
          </div>
          
          <div className="scj-result-item">
            <span className="scj-result-label">iOS Buy Revenue:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {iosBuy.gross.toFixed(2)}
            </span>
          </div>

          <div className="scj-result-item">
            <span className="scj-result-label">Total Revenue:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {totalRevenue.toFixed(2)}
            </span>
          </div>
          
          <div className="scj-result-item">
            <span className="scj-result-label">Platform Share (30%):</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {platformShare.toFixed(2)}
            </span>
          </div>
          
          <div className="scj-result-item">
            <span className="scj-result-label">Net Revenue:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {netRevenue.toFixed(2)}
            </span>
          </div>
          
          <div className="scj-result-item">
            <span className="scj-result-label">Content Creator (75% - 5% TDS):</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {contentCreatorShare.toFixed(2)}
            </span>
          </div>
          
          <div className="scj-result-item">
            <span className="scj-result-label">SCJ Share (25% incl. GST):</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />
              {scjShare.toFixed(2)}
            </span>
          </div>
          
          {/* Transmit Button */}
          <div className="scj-submit-container mt-4">
            <button
              type="button"
              onClick={transmitToDashboard}
              className={`scj-submit-button ${isTransmitted ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isTransmitted}
            >
              {isTransmitted ? '✓ Transmitted to Dashboard' : '📡 Transmit to Dashboard'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVODCalculator; 