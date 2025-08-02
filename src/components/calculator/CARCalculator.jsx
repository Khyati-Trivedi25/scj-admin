import React, { useState, useEffect } from "react";
import CurrencySymbol from "./CurrencySymbol";
import { AnalyticsStorage } from "../../utils/analyticsStorage";

const CARCalculator = ({ currency, onRevenueChange }) => {
  const [inputs, setInputs] = useState({
    adRequests: "",
    car: "",
    ssaiCost: "",
  });
  const [results, setResults] = useState(null);
  const [isTransmitted, setIsTransmitted] = useState(false);

  const totalAdRequests = parseFloat(inputs.adRequests) || 0;
  const costPerAdRequest = parseFloat(inputs.car) || 0;
  const ssai = (parseFloat(inputs.ssaiCost) || 0) * (totalAdRequests / 1000);

  const grossRevenue = totalAdRequests * costPerAdRequest;
  const dashboardUpkeep = grossRevenue * 0.05;
  const deductions = ssai + dashboardUpkeep;
  const netRevenue = grossRevenue - deductions;

  const platformShare = netRevenue * 0.5;
  const contentShareAfterTDS = netRevenue * 0.4 * 0.95;
  const scjShare = netRevenue * 0.1;

  useEffect(() => {
    if (onRevenueChange) {
      onRevenueChange(netRevenue);
    }
  }, [netRevenue, onRevenueChange]);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const transmitToDashboard = () => {
    if (!results) return;
    
    const contentData = {
      id: Date.now(),
      title: `CAR (Cost per Ad Request) Calculation`,
      platform: "General",
      views: totalAdRequests,
      revenue: netRevenue,
      impressions: totalAdRequests,
      grossRevenue: grossRevenue,
      netRevenue: netRevenue,
      deductions: deductions,
      platformShare: platformShare,
      creatorShare: contentShareAfterTDS,
      scjShare: scjShare,
      currency: currency,
      calculationType: "CAR",
      adRequests: totalAdRequests,
      car: costPerAdRequest,
      ssaiCost: parseFloat(inputs.ssaiCost) || 0,
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
      <h2>CAR (Cost per Ad Request) Calculator</h2>
      <form className="scj-form-grid" onSubmit={e => { e.preventDefault(); setResults(true); }}>
        <div className="scj-input-container">
          <span className="scj-input-label">Total Ad Requests</span>
          <input
            type="number"
            placeholder="e.g. 200000"
            value={inputs.adRequests}
            onChange={e => handleInputChange("adRequests", e.target.value)}
            className="scj-input-field"
          />
        </div>
        <div className="scj-input-container">
          <span className="scj-input-label">CAR ({currency})</span>
          <input
            type="number"
            placeholder="e.g. 0.05"
            value={inputs.car}
            onChange={e => handleInputChange("car", e.target.value)}
            className="scj-input-field"
          />
        </div>
        <div className="scj-input-container">
          <span className="scj-input-label">SSAI Cost/1000</span>
          <input
            type="number"
            placeholder="e.g. 2"
            value={inputs.ssaiCost}
            onChange={e => handleInputChange("ssaiCost", e.target.value)}
            className="scj-input-field"
          />
        </div>
        <div className="scj-submit-container">
          <button
            type="submit"
            className="scj-submit-button"
          >
            Create Revenue
          </button>
        </div>
      </form>

      {results && (
        <div className="scj-results">
          <h3>Results</h3>
          <div className="scj-result-item">
            <span className="scj-result-label">Gross Revenue:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />{grossRevenue.toFixed(2)}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">Deductions:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />{deductions.toFixed(2)}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">Net Revenue:</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />{netRevenue.toFixed(2)}
            </span>
          </div>
          <hr className="border-0 h-1 bg-gray-700 opacity-30 my-2" />
          <div className="scj-result-item">
            <span className="scj-result-label">Platform Share (50%):</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />{platformShare.toFixed(2)}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">Content Creator (40% - 5% TDS):</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />{contentShareAfterTDS.toFixed(2)}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">SCJ Share (10% incl. GST):</span>
            <span className="scj-result-value">
              <CurrencySymbol currency={currency} />{scjShare.toFixed(2)}
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

export default CARCalculator; 