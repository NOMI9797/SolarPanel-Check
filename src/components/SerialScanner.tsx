'use client';

import { useState, useEffect } from 'react';
import { Search, X, CheckCircle, AlertCircle, ArrowRight, Info, HelpCircle, Copy, Sparkles } from 'lucide-react';
import { detectBrandFromSerial, getAllSerialPrefixes, SolarBrand } from '@/config/solarBrands';

interface SerialScannerProps {
  onBrandDetected: (brand: SolarBrand) => void;
}

export default function SerialScanner({ onBrandDetected }: SerialScannerProps) {
  const [serialNumber, setSerialNumber] = useState('');
  const [detectedBrand, setDetectedBrand] = useState<SolarBrand | null>(null);
  const [showPrefixes, setShowPrefixes] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (serialNumber.trim()) {
      const brand = detectBrandFromSerial(serialNumber);
      setDetectedBrand(brand);
    } else {
      setDetectedBrand(null);
    }
  }, [serialNumber]);

  const handleSerialSubmit = () => {
    if (detectedBrand) {
      onBrandDetected(detectedBrand);
    }
  };

  const clearSerial = () => {
    setSerialNumber('');
    setDetectedBrand(null);
  };

  const copySerial = () => {
    navigator.clipboard.writeText(serialNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prefixes = getAllSerialPrefixes();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8 border border-gray-100">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            🔍 Serial Number Detector
          </h3>
        </div>
        <p className="text-gray-600 mb-3 text-xs sm:text-sm lg:text-base px-4">
          Enter your solar panel serial number to automatically detect the brand
        </p>
        <button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center space-x-2 text-sm text-green-600 hover:text-green-700 font-medium mx-auto px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 active:bg-green-100"
        >
          <HelpCircle className="h-4 w-4" />
          <span>{showTips ? 'Hide' : 'Show'} serial number tips</span>
        </button>
      </div>

      {/* Serial Number Tips */}
      {showTips && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2 text-xs sm:text-sm">💡 <strong>Where to find your serial number:</strong></p>
              <ul className="space-y-1 ml-4 text-xs sm:text-sm">
                <li>• On the back of your solar panel</li>
                <li>• In your installation documentation</li>
                <li>• On the inverter or monitoring system</li>
                <li>• Usually starts with brand-specific letters (e.g., LR for Longi, CS for Canadian Solar)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Serial Number Input */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter serial number to detect brand..."
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="w-full pl-10 pr-12 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm bg-white text-base sm:text-lg"
          />
          {serialNumber && (
            <button
              onClick={clearSerial}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title="Clear serial number"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Detection Result */}
      {detectedBrand && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 text-sm sm:text-base">
                  🎉 Brand Detected: {detectedBrand.name}
                </h4>
                <p className="text-green-700 text-xs sm:text-sm mb-2">
                  Serial number <span className="font-mono font-medium">&ldquo;{serialNumber}&rdquo;</span> matches {detectedBrand.name} patterns
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copySerial}
                    className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    <Copy className="h-3 w-3" />
                    <span>{copied ? 'Copied!' : 'Copy serial'}</span>
                  </button>
                </div>
              </div>
              <button
                onClick={handleSerialSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <span>Go to {detectedBrand.name}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Match Result */}
      {serialNumber && !detectedBrand && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-900 text-sm sm:text-base">
                  Brand Not Detected
                </h4>
                <p className="text-yellow-700 text-xs sm:text-sm mb-2">
                  Serial number <span className="font-mono font-medium">&ldquo;{serialNumber}&rdquo;</span> doesn&apos;t match any known brand patterns.
                </p>
                <p className="text-yellow-600 text-xs">
                  💡 Try selecting from the brand list below, or check if the serial number is entered correctly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Serial Number Prefixes Guide */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <div className="flex items-center space-x-2">
            <h4 className="text-lg font-semibold text-gray-900">
              📋 Serial Number Prefixes Guide
            </h4>
            <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
              {prefixes.reduce((total, brand) => total + brand.prefixes.length, 0)} prefixes
            </div>
          </div>
          <button
            onClick={() => setShowPrefixes(!showPrefixes)}
            className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 self-start sm:self-auto"
          >
            <span>{showPrefixes ? 'Hide' : 'Show'} Prefixes</span>
            {showPrefixes ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </button>
        </div>
        
        {showPrefixes && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prefixes.map((brandInfo) => (
              <div key={brandInfo.brand} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                <h5 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <span className="text-sm sm:text-base">{brandInfo.brand}</span>
                  <span className="text-xs text-gray-500">({brandInfo.prefixes.length})</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {brandInfo.prefixes.map((prefix) => (
                    <span
                      key={prefix}
                      className="px-2 py-1 bg-white text-gray-700 text-xs rounded border border-gray-300 font-mono hover:bg-gray-100 transition-colors duration-200 cursor-pointer active:bg-gray-200"
                      onClick={() => setSerialNumber(prefix + '2024DEMO')}
                      title={`Click to test with ${prefix}2024DEMO`}
                    >
                      {prefix}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Examples */}
      <div className="max-w-4xl mx-auto mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <span>💡 Quick Examples</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { example: 'LR2024ABC123', brand: 'Longi Solar' },
            { example: 'CS6P-250P', brand: 'Canadian Solar' },
            { example: 'JKM400M-72', brand: 'Jinko Solar' },
            { example: 'TSM-400DC', brand: 'Trina Solar' },
            { example: 'ARM2024XYZ', brand: 'ARM Solar' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setSerialNumber(item.example)}
              className="text-left p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200 hover:border-gray-300 hover:shadow-sm active:bg-gray-200"
            >
              <div className="font-mono text-xs sm:text-sm text-gray-700 mb-1 break-all">{item.example}</div>
              <div className="text-xs text-gray-500">{item.brand}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 