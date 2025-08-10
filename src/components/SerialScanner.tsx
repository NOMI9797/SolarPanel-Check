'use client';

import { useState, useEffect } from 'react';
import { Search, Camera, X, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { detectBrandFromSerial, getAllSerialPrefixes, SolarBrand } from '@/config/solarBrands';

interface SerialScannerProps {
  onBrandDetected: (brand: SolarBrand) => void;
}

export default function SerialScanner({ onBrandDetected }: SerialScannerProps) {
  const [serialNumber, setSerialNumber] = useState('');
  const [detectedBrand, setDetectedBrand] = useState<SolarBrand | null>(null);
  const [showPrefixes, setShowPrefixes] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

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

  const handleScanClick = () => {
    setIsScanning(true);
    // Simulate scanning - in a real app, this would integrate with camera API
    setTimeout(() => {
      setIsScanning(false);
      // For demo purposes, let's simulate a detected serial
      const demoSerial = 'LR2024ABC123';
      setSerialNumber(demoSerial);
    }, 2000);
  };

  const clearSerial = () => {
    setSerialNumber('');
    setDetectedBrand(null);
  };

  const prefixes = getAllSerialPrefixes();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🔍 Serial Number Scanner
        </h3>
        <p className="text-gray-600">
          Enter or scan your solar panel serial number to automatically detect the brand
        </p>
      </div>

      {/* Serial Number Input */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter serial number (e.g., LR2024ABC123)"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="w-full pl-10 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm bg-white text-lg"
            />
            {serialNumber && (
              <button
                onClick={clearSerial}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
          
          <button
            onClick={handleScanClick}
            disabled={isScanning}
            className={`px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
              isScanning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg'
            }`}
          >
            {isScanning ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Scanning...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Scan</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Detection Result */}
      {detectedBrand && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div className="flex-1">
                <h4 className="font-semibold text-green-900">
                  Brand Detected: {detectedBrand.name}
                </h4>
                <p className="text-green-700 text-sm">
                  Serial number "{serialNumber}" matches {detectedBrand.name} patterns
                </p>
              </div>
              <button
                onClick={handleSerialSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
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
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-900">
                  Brand Not Detected
                </h4>
                <p className="text-yellow-700 text-sm">
                  Serial number "{serialNumber}" doesn't match any known brand patterns. 
                  Try selecting from the brand list below.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Serial Number Prefixes Guide */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">
            📋 Serial Number Prefixes Guide
          </h4>
          <button
            onClick={() => setShowPrefixes(!showPrefixes)}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {showPrefixes ? 'Hide' : 'Show'} Prefixes
          </button>
        </div>
        
        {showPrefixes && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prefixes.map((brandInfo) => (
              <div key={brandInfo.brand} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-2">{brandInfo.brand}</h5>
                <div className="flex flex-wrap gap-2">
                  {brandInfo.prefixes.map((prefix) => (
                    <span
                      key={prefix}
                      className="px-2 py-1 bg-white text-gray-700 text-xs rounded border border-gray-300 font-mono"
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
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          💡 Quick Examples
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
              className="text-left p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="font-mono text-sm text-gray-700 mb-1">{item.example}</div>
              <div className="text-xs text-gray-500">{item.brand}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 