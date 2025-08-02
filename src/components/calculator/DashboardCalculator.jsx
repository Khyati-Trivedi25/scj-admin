import React, { useState } from "react";
import CPMCalculator from "./CPMCalculator";
import CPICalculator from "./CPICalculator";
import MGCalculator from "./MGCalculator";
import CARCalculator from "./CARCalculator";
import TVODCalculator from "./TVODCalculator";
import Sidebar from "./Sidebar";
import CurrencyToggle from "./CurrencyToggle";
import CurrencySymbol from "./CurrencySymbol";
import PlatformSelector from "./PlatformSelector";

const DashboardCalculator = () => {
  const [selectedModel, setSelectedModel] = useState("CPM");
  const [currency, setCurrency] = useState("INR");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["YouTube"]);
  const [platformRevenues, setPlatformRevenues] = useState({});

  const handleRevenueChange = (platform, revenue) => {
    setPlatformRevenues((prev) => ({
      ...prev,
      [platform]: revenue || 0, // prevent NaN
    }));
  };

  const getTotalRevenue = () => {
    return Object.values(platformRevenues).reduce((acc, rev) => acc + rev, 0);
  };

  const renderCalculator = (platform) => {
    const props = {
      currency,
      platformName: platform,
      onRevenueChange: (rev) => handleRevenueChange(platform, rev),
    };

    switch (selectedModel) {
      case "CPM":
        return <CPMCalculator {...props} />;
      case "CPI":
        return <CPICalculator {...props} />;
      case "MG":
        return <MGCalculator {...props} />;
      case "CAR":
        return <CARCalculator {...props} />;
      case "TVOD":
        return <TVODCalculator currency={currency} />;
      default:
        return <div>Select a model</div>;
    }
  };

  return (
    <div className="scj-calculator">
      {/* Sidebar */}
      <Sidebar selectedModel={selectedModel} onSelectModel={setSelectedModel} />

      {/* Main Content */}
      <div className="scj-main-content">
        {/* Back Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          padding: '0 20px'
        }}>
                     <button
             onClick={() => window.close()}
             style={{
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               color: 'white',
               border: 'none',
               padding: '10px 20px',
               borderRadius: '8px',
               cursor: 'pointer',
               fontSize: '14px',
               fontWeight: '600',
               display: 'flex',
               alignItems: 'center',
               gap: '8px'
             }}
           >
             ← Back
           </button>
          <h2 style={{ margin: 0, color: '#495057' }}>Revenue Calculator</h2>
        </div>

        {/* Controls */}
        <div className="scj-controls">
          <PlatformSelector
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />
          <CurrencyToggle currency={currency} setCurrency={setCurrency} />
        </div>

        {/* Calculators */}
        <div className="scj-calculators">
          {selectedPlatforms.map((platform) => (
            <div key={platform} className="scj-calculator-container">
              <h3 className="scj-calculator-title">
                {platform}
              </h3>
              {renderCalculator(platform)}
            </div>
          ))}
        </div>

        {/* Total Revenue */}
        {selectedPlatforms.length > 1 && (
          <div className="scj-total-revenue">
            Total Revenue: <CurrencySymbol currency={currency} />
            {getTotalRevenue().toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCalculator; 