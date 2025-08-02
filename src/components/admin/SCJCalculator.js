import React, { useState } from 'react';
import { FaCalculator, FaTimes, FaDollarSign, FaRupeeSign } from 'react-icons/fa';

const SCJCalculator = ({ isOpen, onClose, contentData = null }) => {
  const [activeCalculator, setActiveCalculator] = useState('cpm');
  const [currency, setCurrency] = useState('USD');
  const [platformName, setPlatformName] = useState('YouTube');

  // CPM Calculator State
  const [cpmInputs, setCpmInputs] = useState({
    'Pre Roll': { impressions: '', cpm: '' },
    'Mid Roll': { impressions: '', cpm: '' },
    'Post Roll': { impressions: '', cpm: '' },
    'Sponsored Overlay': { impressions: '', cpm: '' },
    'Banner': { impressions: '', cpm: '' }
  });
  const [cpmSsaiCost, setCpmSsaiCost] = useState('');
  const [cpmResults, setCpmResults] = useState(null);

  // CPI Calculator State
  const [cpiInputs, setCpiInputs] = useState({
    'Pre Roll': { impressions: '', cpi: '' },
    'Mid Roll': { impressions: '', cpi: '' },
    'Post Roll': { impressions: '', cpi: '' },
    'Sponsored Overlay': { impressions: '', cpi: '' },
    'Banner': { impressions: '', cpi: '' }
  });
  const [cpiSsaiCost, setCpiSsaiCost] = useState('');
  const [cpiResults, setCpiResults] = useState(null);

  // MG Calculator State
  const [mgInputs, setMgInputs] = useState({
    'Pre Roll': { impressions: '', cpm: '', cpi: '' },
    'Mid Roll': { impressions: '', cpm: '', cpi: '' },
    'Post Roll': { impressions: '', cpm: '', cpi: '' },
    'Sponsored Overlay': { impressions: '', cpm: '', cpi: '' },
    'Banner': { impressions: '', cpm: '', cpi: '' }
  });
  const [mgSsaiCost, setMgSsaiCost] = useState('');
  const [minimumGuarantee, setMinimumGuarantee] = useState('');
  const [mgResults, setMgResults] = useState(null);

  // TVOD Calculator State
  const [tvodInputs, setTvodInputs] = useState({
    androidRent: '', androidBuy: '', iosRent: '', iosBuy: '',
    androidRentPrice: '', androidBuyPrice: '', iosRentPrice: '', iosBuyPrice: ''
  });
  const [tvodResults, setTvodResults] = useState(null);

  // CAR Calculator State
  const [carInputs, setCarInputs] = useState({
    adRequests: '', car: '', ssaiCost: ''
  });
  const [carResults, setCarResults] = useState(null);

  const currencySymbol = currency === 'INR' ? '₹' : '$';
  const adTypes = ['Pre Roll', 'Mid Roll', 'Post Roll', 'Sponsored Overlay', 'Banner'];

  // CPM Calculator Functions
  const handleCpmInputChange = (type, field, value) => {
    setCpmInputs(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const calculateCpmRevenue = () => {
    let gross = 0;
    let totalImpressions = 0;
    const breakdown = {};

    adTypes.forEach(type => {
      const imp = parseFloat(cpmInputs[type].impressions || 0);
      const cpm = parseFloat(cpmInputs[type].cpm || 0);
      const revenue = (imp / 1000) * cpm;

      breakdown[type] = revenue;
      gross += revenue;
      totalImpressions += imp;
    });

    const upkeep = 0.05 * gross;
    const ssai = (totalImpressions / 1000) * parseFloat(cpmSsaiCost || 0);
    const deductions = upkeep + ssai;
    const net = gross - deductions;

    const platform = 0.5 * net;
    const creatorGross = 0.4 * net;
    const tds = 0.05 * creatorGross;
    const creator = creatorGross - tds;
    const scj = 0.1 * net;

    setCpmResults({
      breakdown, gross, totalImpressions, deductions, net,
      shares: { platform, creator, scj }
    });
  };

  // CPI Calculator Functions
  const handleCpiInputChange = (type, field, value) => {
    setCpiInputs(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const calculateCpiRevenue = () => {
    let gross = 0;
    let totalImpressions = 0;
    const breakdown = {};

    adTypes.forEach(type => {
      const imp = parseFloat(cpiInputs[type].impressions || 0);
      const cpi = parseFloat(cpiInputs[type].cpi || 0);
      const revenue = imp * cpi;

      breakdown[type] = revenue;
      gross += revenue;
      totalImpressions += imp;
    });

    const upkeep = 0.05 * gross;
    const ssai = (totalImpressions / 1000) * parseFloat(cpiSsaiCost || 0);
    const deductions = upkeep + ssai;
    const net = gross - deductions;

    const platform = 0.5 * net;
    const creatorGross = 0.4 * net;
    const tds = 0.05 * creatorGross;
    const creator = creatorGross - tds;
    const scj = 0.1 * net;

    setCpiResults({
      breakdown, gross, totalImpressions, deductions, net,
      shares: { platform, creator, scj }
    });
  };

  // MG Calculator Functions
  const handleMgInputChange = (type, field, value) => {
    setMgInputs(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const calculateMgRevenue = () => {
    let gross = 0;
    let totalImpressions = 0;
    const breakdown = {};

    adTypes.forEach(type => {
      const imp = parseFloat(mgInputs[type].impressions || 0);
      const cpm = parseFloat(mgInputs[type].cpm || 0);
      const cpi = parseFloat(mgInputs[type].cpi || 0);
      const revenue = (imp / 1000) * cpm + imp * cpi;

      breakdown[type] = revenue;
      gross += revenue;
      totalImpressions += imp;
    });

    const minG = parseFloat(minimumGuarantee || 0);
    gross += minG;

    const upkeep = 0.05 * gross;
    const ssai = (totalImpressions / 1000) * parseFloat(mgSsaiCost || 0);
    const deductions = upkeep + ssai;
    const net = gross - deductions;

    const platform = 0.5 * net;
    const creatorGross = 0.4 * net;
    const tds = 0.05 * creatorGross;
    const creator = creatorGross - tds;
    const scj = 0.1 * net;

    setMgResults({
      breakdown, minimumGuarantee: minG, gross, totalImpressions, deductions, net,
      shares: { platform, creator, scj }
    });
  };

  // TVOD Calculator Functions
  const handleTvodInputChange = (field, value) => {
    setTvodInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateTvodRevenue = () => {
    const parse = (val) => parseFloat(val) || 0;

    const calculateNet = (platformKey) => {
      const priceKey = platformKey + 'Price';
      const ticketPrice = parse(tvodInputs[priceKey]);
      const gst = ticketPrice * 0.18;
      const transactionFee = currency === 'INR' ? 3 : 0.1;
      const isIOS = platformKey.includes('ios');
      const inAppFee = isIOS ? ticketPrice * 0.25 : 0;
      return ticketPrice - gst - transactionFee - inAppFee;
    };

    const calcRevenue = (platformKey) => {
      const streams = parse(tvodInputs[platformKey]);
      const net = calculateNet(platformKey);
      return { streams, net, gross: streams * net };
    };

    const androidRent = calcRevenue('androidRent');
    const androidBuy = calcRevenue('androidBuy');
    const iosRent = calcRevenue('iosRent');
    const iosBuy = calcRevenue('iosBuy');

    const totalRevenue = androidRent.gross + androidBuy.gross + iosRent.gross + iosBuy.gross;
    const platformShare = totalRevenue * 0.3;
    const netRevenue = totalRevenue - platformShare;
    const contentCreatorShare = netRevenue * 0.75 * 0.95;
    const scjShare = netRevenue * 0.25;

    setTvodResults({
      androidRent, androidBuy, iosRent, iosBuy,
      totalRevenue, platformShare, netRevenue, contentCreatorShare, scjShare
    });
  };

  // CAR Calculator Functions
  const handleCarInputChange = (field, value) => {
    setCarInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateCarRevenue = () => {
    const totalAdRequests = parseFloat(carInputs.adRequests) || 0;
    const costPerAdRequest = parseFloat(carInputs.car) || 0;
    const ssai = (parseFloat(carInputs.ssaiCost) || 0) * (totalAdRequests / 1000);

    const grossRevenue = totalAdRequests * costPerAdRequest;
    const dashboardUpkeep = grossRevenue * 0.05;
    const deductions = ssai + dashboardUpkeep;
    const netRevenue = grossRevenue - deductions;

    const platformShare = netRevenue * 0.5;
    const contentShareAfterTDS = netRevenue * 0.4 * 0.95;
    const scjShare = netRevenue * 0.1;

    setCarResults({
      grossRevenue, deductions, netRevenue, platformShare, contentShareAfterTDS, scjShare
    });
  };

  const renderCpmCalculator = () => (
    <div>
      <h3 className="text-xl font-bold mb-4 text-purple-500">CPM Revenue Calculator</h3>
      <form onSubmit={(e) => { e.preventDefault(); calculateCpmRevenue(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {adTypes.map(type => (
            <React.Fragment key={type}>
              <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                <span className="text-gray-300 min-w-[120px] text-sm">{type} Impressions</span>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  value={cpmInputs[type].impressions}
                  onChange={(e) => handleCpmInputChange(type, 'impressions', e.target.value)}
                  className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                />
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                <span className="text-gray-300 min-w-[120px] text-sm">{type} CPM ({currencySymbol})</span>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={cpmInputs[type].cpm}
                  onChange={(e) => handleCpmInputChange(type, 'cpm', e.target.value)}
                  className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800 mb-4">
          <span className="text-gray-300 min-w-[120px] text-sm">SSAI Cost/1000</span>
          <input
            type="number"
            placeholder={`e.g. 2 (${currencySymbol})`}
            value={cpmSsaiCost}
            onChange={(e) => setCpmSsaiCost(e.target.value)}
            className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded hover:from-blue-700 hover:to-purple-700">
          Calculate Revenue
        </button>
      </form>

      {cpmResults && (
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-purple-500">Results</h4>
          <ResultRow label="Gross Revenue:" value={`${currencySymbol}${cpmResults.gross.toFixed(2)}`} />
          <ResultRow label="Total Impressions:" value={cpmResults.totalImpressions} />
          <ResultRow label="Total Deductions:" value={`${currencySymbol}${cpmResults.deductions.toFixed(2)}`} />
          <ResultRow label="Net Revenue:" value={`${currencySymbol}${cpmResults.net.toFixed(2)}`} />
          <hr className="border-gray-600" />
          <ResultRow label="Platform Share (50%):" value={`${currencySymbol}${cpmResults.shares.platform.toFixed(2)}`} />
          <ResultRow label="Content Creator (40% - 5% TDS):" value={`${currencySymbol}${cpmResults.shares.creator.toFixed(2)}`} />
          <ResultRow label="SCJ Entertainment (10%):" value={`${currencySymbol}${cpmResults.shares.scj.toFixed(2)}`} />
        </div>
      )}
    </div>
  );

  const renderCpiCalculator = () => (
    <div>
      <h3 className="text-xl font-bold mb-4 text-purple-500">CPI Revenue Calculator</h3>
      <form onSubmit={(e) => { e.preventDefault(); calculateCpiRevenue(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {adTypes.map(type => (
            <React.Fragment key={type}>
              <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                <span className="text-gray-300 min-w-[120px] text-sm">{type} Impressions</span>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  value={cpiInputs[type].impressions}
                  onChange={(e) => handleCpiInputChange(type, 'impressions', e.target.value)}
                  className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                />
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                <span className="text-gray-300 min-w-[120px] text-sm">{type} CPI ({currencySymbol})</span>
                <input
                  type="number"
                  placeholder="e.g. 2"
                  value={cpiInputs[type].cpi}
                  onChange={(e) => handleCpiInputChange(type, 'cpi', e.target.value)}
                  className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800 mb-4">
          <span className="text-gray-300 min-w-[120px] text-sm">SSAI Cost/1000</span>
          <input
            type="number"
            placeholder={`e.g. 2 (${currencySymbol})`}
            value={cpiSsaiCost}
            onChange={(e) => setCpiSsaiCost(e.target.value)}
            className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded hover:from-blue-700 hover:to-purple-700">
          Calculate Revenue
        </button>
      </form>

      {cpiResults && (
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-purple-500">Results</h4>
          <ResultRow label="Gross Revenue:" value={`${currencySymbol}${cpiResults.gross.toFixed(2)}`} />
          <ResultRow label="Total Impressions:" value={cpiResults.totalImpressions} />
          <ResultRow label="Total Deductions:" value={`${currencySymbol}${cpiResults.deductions.toFixed(2)}`} />
          <ResultRow label="Net Revenue:" value={`${currencySymbol}${cpiResults.net.toFixed(2)}`} />
          <hr className="border-gray-600" />
          <ResultRow label="Platform Share (50%):" value={`${currencySymbol}${cpiResults.shares.platform.toFixed(2)}`} />
          <ResultRow label="Content Creator (40% - 5% TDS):" value={`${currencySymbol}${cpiResults.shares.creator.toFixed(2)}`} />
          <ResultRow label="SCJ Entertainment (10%):" value={`${currencySymbol}${cpiResults.shares.scj.toFixed(2)}`} />
        </div>
      )}
    </div>
  );

  const renderMgCalculator = () => (
    <div>
      <h3 className="text-xl font-bold mb-4 text-purple-500">MG + Revenue Share Calculator</h3>
      <form onSubmit={(e) => { e.preventDefault(); calculateMgRevenue(); }}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {adTypes.map(type => (
            <React.Fragment key={type}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                  <span className="text-gray-300 min-w-[120px] text-sm">{type} Impressions</span>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    value={mgInputs[type].impressions}
                    onChange={(e) => handleMgInputChange(type, 'impressions', e.target.value)}
                    className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                  <span className="text-gray-300 min-w-[120px] text-sm">{type} CPM ({currencySymbol})</span>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={mgInputs[type].cpm}
                    onChange={(e) => handleMgInputChange(type, 'cpm', e.target.value)}
                    className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                <span className="text-gray-300 min-w-[120px] text-sm">{type} CPI ({currencySymbol})</span>
                <input
                  type="number"
                  placeholder="e.g. 2"
                  value={mgInputs[type].cpi}
                  onChange={(e) => handleMgInputChange(type, 'cpi', e.target.value)}
                  className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800 mb-4">
          <span className="text-gray-300 min-w-[120px] text-sm">SSAI Cost/1000</span>
          <input
            type="number"
            placeholder={`e.g. 2 (${currencySymbol})`}
            value={mgSsaiCost}
            onChange={(e) => setMgSsaiCost(e.target.value)}
            className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
          />
        </div>
        <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800 mb-4">
          <span className="text-gray-300 min-w-[120px] text-sm">Minimum Guarantee</span>
          <input
            type="number"
            placeholder={`e.g. 1000 (${currencySymbol})`}
            value={minimumGuarantee}
            onChange={(e) => setMinimumGuarantee(e.target.value)}
            className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded hover:from-blue-700 hover:to-purple-700">
          Calculate Revenue
        </button>
      </form>

      {mgResults && (
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-purple-500">Results</h4>
          <ResultRow label="Gross Revenue (incl. MG):" value={`${currencySymbol}${mgResults.gross.toFixed(2)}`} />
          <ResultRow label="Total Impressions:" value={mgResults.totalImpressions} />
          <ResultRow label="Total Deductions:" value={`${currencySymbol}${mgResults.deductions.toFixed(2)}`} />
          <ResultRow label="Net Revenue:" value={`${currencySymbol}${mgResults.net.toFixed(2)}`} />
          <hr className="border-gray-600" />
          <ResultRow label="Platform Share (50%):" value={`${currencySymbol}${mgResults.shares.platform.toFixed(2)}`} />
          <ResultRow label="Content Creator (40% - 5% TDS):" value={`${currencySymbol}${mgResults.shares.creator.toFixed(2)}`} />
          <ResultRow label="SCJ (10% incl. GST):" value={`${currencySymbol}${mgResults.shares.scj.toFixed(2)}`} />
        </div>
      )}
    </div>
  );

  const renderTvodCalculator = () => (
    <div>
      <h3 className="text-xl font-bold mb-4 text-purple-500">TVOD Revenue Calculator</h3>
      <form onSubmit={(e) => { e.preventDefault(); calculateTvodRevenue(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            ['androidRent', 'Android Rent'],
            ['androidBuy', 'Android Buy'],
            ['iosRent', 'iOS Rent'],
            ['iosBuy', 'iOS Buy']
          ].map(([key, label]) => (
            <React.Fragment key={key}>
              <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                <span className="text-gray-300 min-w-[120px] text-sm">{label} Streams</span>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={tvodInputs[key]}
                  onChange={(e) => handleTvodInputChange(key, e.target.value)}
                  className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                />
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
                <span className="text-gray-300 min-w-[120px] text-sm">{label} Price ({currency})</span>
                <input
                  type="number"
                  placeholder="e.g. 120 or 1.99"
                  value={tvodInputs[key + 'Price']}
                  onChange={(e) => handleTvodInputChange(key + 'Price', e.target.value)}
                  className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded hover:from-blue-700 hover:to-purple-700">
          Calculate Revenue
        </button>
      </form>

      {tvodResults && (
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-purple-500">Results</h4>
          <ResultRow label="Android Rent Revenue:" value={`${currencySymbol}${tvodResults.androidRent.gross.toFixed(2)}`} />
          <ResultRow label="Android Buy Revenue:" value={`${currencySymbol}${tvodResults.androidBuy.gross.toFixed(2)}`} />
          <ResultRow label="iOS Rent Revenue:" value={`${currencySymbol}${tvodResults.iosRent.gross.toFixed(2)}`} />
          <ResultRow label="iOS Buy Revenue:" value={`${currencySymbol}${tvodResults.iosBuy.gross.toFixed(2)}`} />
          <ResultRow label="Total Revenue:" value={`${currencySymbol}${tvodResults.totalRevenue.toFixed(2)}`} />
          <ResultRow label="Platform Share (30%):" value={`${currencySymbol}${tvodResults.platformShare.toFixed(2)}`} />
          <ResultRow label="Net Revenue:" value={`${currencySymbol}${tvodResults.netRevenue.toFixed(2)}`} />
          <ResultRow label="Content Creator (75% - 5% TDS):" value={`${currencySymbol}${tvodResults.contentCreatorShare.toFixed(2)}`} />
          <ResultRow label="SCJ Share (25% incl. GST):" value={`${currencySymbol}${tvodResults.scjShare.toFixed(2)}`} />
        </div>
      )}
    </div>
  );

  const renderCarCalculator = () => (
    <div>
      <h3 className="text-xl font-bold mb-4 text-purple-500">CAR (Cost per Ad Request) Calculator</h3>
      <form onSubmit={(e) => { e.preventDefault(); calculateCarRevenue(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
            <span className="text-gray-300 min-w-[120px] text-sm">Total Ad Requests</span>
            <input
              type="number"
              placeholder="e.g. 200000"
              value={carInputs.adRequests}
              onChange={(e) => handleCarInputChange('adRequests', e.target.value)}
              className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
            />
          </div>
          <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800">
            <span className="text-gray-300 min-w-[120px] text-sm">CAR ({currency})</span>
            <input
              type="number"
              placeholder="e.g. 0.05"
              value={carInputs.car}
              onChange={(e) => handleCarInputChange('car', e.target.value)}
              className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 border border-gray-600 rounded bg-gray-800 mb-4">
          <span className="text-gray-300 min-w-[120px] text-sm">SSAI Cost/1000</span>
          <input
            type="number"
            placeholder="e.g. 2"
            value={carInputs.ssaiCost}
            onChange={(e) => handleCarInputChange('ssaiCost', e.target.value)}
            className="flex-1 p-1 border border-gray-600 rounded bg-gray-700 text-white text-right text-sm"
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded hover:from-blue-700 hover:to-purple-700">
          Calculate Revenue
        </button>
      </form>

      {carResults && (
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-purple-500">Results</h4>
          <ResultRow label="Gross Revenue:" value={`${currencySymbol}${carResults.grossRevenue.toFixed(2)}`} />
          <ResultRow label="Deductions:" value={`${currencySymbol}${carResults.deductions.toFixed(2)}`} />
          <ResultRow label="Net Revenue:" value={`${currencySymbol}${carResults.netRevenue.toFixed(2)}`} />
          <hr className="border-gray-600" />
          <ResultRow label="Platform Share (50%):" value={`${currencySymbol}${carResults.platformShare.toFixed(2)}`} />
          <ResultRow label="Content Creator (40% - 5% TDS):" value={`${currencySymbol}${carResults.contentShareAfterTDS.toFixed(2)}`} />
          <ResultRow label="SCJ Share (10% incl. GST):" value={`${currencySymbol}${carResults.scjShare.toFixed(2)}`} />
        </div>
      )}
    </div>
  );

  const ResultRow = ({ label, value }) => (
    <div className="flex items-center gap-3">
      <span className="font-bold text-gray-300 min-w-[160px]">{label}</span>
      <div className="flex-1 p-2 border border-gray-600 rounded bg-gray-800 text-white text-right">
        {value}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              <FaCalculator className="inline mr-2" />
              SCJ Revenue Calculator
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>
          </div>

          {/* Calculator Type Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'cpm', label: 'CPM Calculator' },
              { key: 'cpi', label: 'CPI Calculator' },
              { key: 'mg', label: 'MG Calculator' },
              { key: 'tvod', label: 'TVOD Calculator' },
              { key: 'car', label: 'CAR Calculator' }
            ].map(calc => (
              <button
                key={calc.key}
                onClick={() => setActiveCalculator(calc.key)}
                className={`px-4 py-2 rounded ${
                  activeCalculator === calc.key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {calc.label}
              </button>
            ))}
          </div>

          {/* Currency and Platform Selector */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Platform:</span>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                placeholder="Platform Name"
                className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
              />
            </div>
          </div>

          {/* Calculator Content */}
          <div className="bg-gray-800 rounded-lg p-6">
            {activeCalculator === 'cpm' && renderCpmCalculator()}
            {activeCalculator === 'cpi' && renderCpiCalculator()}
            {activeCalculator === 'mg' && renderMgCalculator()}
            {activeCalculator === 'tvod' && renderTvodCalculator()}
            {activeCalculator === 'car' && renderCarCalculator()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCJCalculator; 