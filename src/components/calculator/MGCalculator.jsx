import React, { useState } from "react";
import CurrencyToggle from "./CurrencyToggle";
import PlatformSelector from "./PlatformSelector";
import { AnalyticsStorage } from "../../utils/analyticsStorage";

const adTypes = [
  "Pre Roll",
  "Mid Roll",
  "Post Roll",
  "Sponsored Overlay",
  "Banner",
];

const MGCalculator = ({ currency, platformName, onRevenueChange }) => {

  const [inputs, setInputs] = useState(
    adTypes.reduce((acc, type) => {
      acc[type] = { impressions: "", cpm: "", cpi: "" };
      return acc;
    }, {})
  );

  const [ssaiCost, setSsaiCost] = useState("");
  const [minimumGuarantee, setMinimumGuarantee] = useState("");
  const [results, setResults] = useState(null);
  const [isTransmitted, setIsTransmitted] = useState(false);

  const currencySymbol = currency === "INR" ? "₹" : "$";

  const handleInputChange = (type, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const calculateRevenue = () => {
    let gross = 0;
    let totalImpressions = 0;
    const breakdown = {};

    adTypes.forEach((type) => {
      const imp = parseFloat(inputs[type].impressions || 0);
      const cpm = parseFloat(inputs[type].cpm || 0);
      const cpi = parseFloat(inputs[type].cpi || 0);

      const revenue = (imp / 1000) * cpm + imp * cpi;

      breakdown[type] = revenue;
      gross += revenue;
      totalImpressions += imp;
    });

    const minG = parseFloat(minimumGuarantee || 0);
    gross += minG;

    const upkeep = 0.05 * gross;
    const ssai = (totalImpressions / 1000) * parseFloat(ssaiCost || 0);
    const deductions = upkeep + ssai;
    const net = gross - deductions;

    const platform = 0.5 * net;
    const creatorGross = 0.4 * net;
    const tds = 0.05 * creatorGross;
    const creator = creatorGross - tds;
    const scj = 0.1 * net;

    setResults({
      breakdown,
      minimumGuarantee: minG,
      gross,
      totalImpressions,
      deductions,
      net,
      shares: { platform, creator, scj },
    });
    if (onRevenueChange) onRevenueChange(net);
  };

  const transmitToDashboard = () => {
    if (!results) return;
    
    const contentData = {
      id: Date.now(),
      title: `${platformName} MG + Revenue Share Calculation`,
      platform: platformName,
      views: results.totalImpressions,
      revenue: results.net,
      impressions: results.totalImpressions,
      grossRevenue: results.gross,
      netRevenue: results.net,
      deductions: results.deductions,
      minimumGuarantee: results.minimumGuarantee,
      platformShare: results.shares.platform,
      creatorShare: results.shares.creator,
      scjShare: results.shares.scj,
      currency: currency,
      calculationType: "MG",
      breakdown: results.breakdown,
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
      <h2>MG + Revenue Share Calculator</h2>

      
      <form
        className="scj-form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          calculateRevenue();
        }}
      >
        {adTypes.map((type) => (
          <React.Fragment key={type}>
            {/* Row: Impressions + CPM */}
            <div className="scj-input-group">
              <div className="scj-input-container">
                <span className="scj-input-label">
                  {type} Impressions
                </span>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  value={inputs[type].impressions}
                  onChange={(e) =>
                    handleInputChange(type, "impressions", e.target.value)
                  }
                  className="scj-input-field"
                />
              </div>
              <div className="scj-input-container">
                <span className="scj-input-label">
                  {type} CPM ({currencySymbol})
                </span>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={inputs[type].cpm}
                  onChange={(e) =>
                    handleInputChange(type, "cpm", e.target.value)
                  }
                  className="scj-input-field"
                />
              </div>
            </div>

            {/* Row: CPI */}
            <div className="scj-input-container">
              <span className="scj-input-label">
                {type} CPI ({currencySymbol})
              </span>
              <input
                type="number"
                placeholder="e.g. 2"
                value={inputs[type].cpi}
                onChange={(e) => handleInputChange(type, "cpi", e.target.value)}
                className="scj-input-field"
              />
            </div>
          </React.Fragment>
        ))}

        {/* SSAI & MG fields */}
        <div className="scj-input-container">
          <span className="scj-input-label">
            SSAI Cost/1000
          </span>
          <input
            type="number"
            placeholder={`e.g. 2 (${currencySymbol})`}
            value={ssaiCost}
            onChange={(e) => setSsaiCost(e.target.value)}
            className="scj-input-field"
          />
        </div>
        <div className="scj-input-container">
          <span className="scj-input-label">
            Minimum Guarantee
          </span>
          <input
            type="number"
            placeholder={`e.g. 1000 (${currencySymbol})`}
            value={minimumGuarantee}
            onChange={(e) => setMinimumGuarantee(e.target.value)}
            className="scj-input-field"
          />
        </div>

        {/* Submit */}
        <div className="scj-submit-container">
          <button
            type="submit"
            className="scj-submit-button"
          >
            Calculate Revenue
          </button>
        </div>
      </form>

      {results && (
        <div className="scj-results">
          <h3>Results</h3>
          <div className="scj-result-item">
            <span className="scj-result-label">Gross Revenue (incl. MG):</span>
            <span className="scj-result-value">
              {currencySymbol}
              {results.gross.toFixed(2)}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">Total Impressions:</span>
            <span className="scj-result-value">
              {results.totalImpressions}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">Total Deductions:</span>
            <span className="scj-result-value">
              {currencySymbol}
              {results.deductions.toFixed(2)}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">Net Revenue:</span>
            <span className="scj-result-value">
              {currencySymbol}
              {results.net.toFixed(2)}
            </span>
          </div>
          <hr className="border-0 h-1 bg-gray-700 opacity-30 my-2" />
          <div className="scj-result-item">
            <span className="scj-result-label">Platform Share (50%):</span>
            <span className="scj-result-value">
              {currencySymbol}
              {results.shares.platform.toFixed(2)}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">Content Creator (40% - 5% TDS):</span>
            <span className="scj-result-value">
              {currencySymbol}
              {results.shares.creator.toFixed(2)}
            </span>
          </div>
          <div className="scj-result-item">
            <span className="scj-result-label">SCJ (10% incl. GST):</span>
            <span className="scj-result-value">
              {currencySymbol}
              {results.shares.scj.toFixed(2)}
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

export default MGCalculator; 